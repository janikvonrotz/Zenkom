import ldap from 'ldapjs'
import assert from 'assert'
import { Accounts } from 'meteor/accounts-base'
import Future from 'fibers/future'

var ldapAuth = {
  url: 'ldap://ldap.forumsys.com',
  searchOu: 'dc=example,dc=com',
  searchQuery: (email) => {
    return {
      filter: `(mail=${email})`,
      scope: 'sub'
    }
  }
}

ldapAuth.checkAccount = (options) => {
  options = options || {}

  ldapAuth.client = ldap.createClient({
    url: ldapAuth.url
  })

  let dn = []
  var future = new Future()

  ldapAuth.client.search(ldapAuth.searchOu, ldapAuth.searchQuery(options.email), (error, result) => {
    assert.ifError(error)

    result.on('searchEntry', (entry) => {
      dn.push(entry.objectName)
      return ldapAuth.profile = {
        firstname: entry.object.cn,
        lastname: entry.object.sn
      }
    })

    result.on('error', function(error){
      throw new Meteor.Error(500, "LDAP server error")
    })

    return result.on('end', function(){

      if (dn.length === 0) {
        future['return'](false)
        return false
      }

      return ldapAuth.client.bind(dn[0], options.pass, (error) => {

        if (error) {
          future['return'](false)
          return false
        }

        return ldapAuth.client.unbind((error) => {
          assert.ifError(error)
          return future['return'](!error)
        })
      })
    })
  })
  return future.wait()
}

Accounts.registerLoginHandler('ldap', (loginRequest) => {

  if (!loginRequest.ldap) {
    return undefined
  }

  if (ldapAuth.checkAccount(loginRequest)) {
    var userId = null
    var user = Meteor.users.findOne({ "emails.address" : loginRequest.email })
    if (!user) {
      userId = Accounts.createUser({
        email: loginRequest.email,
        password: loginRequest.pass,
        profile: ldapAuth.profile,
        roles: ['user'],
      })
      Meteor.users.update(userId, { $set: { 'emails.0.verified': true } })
    } else {
      userId = user._id
    }

    let stampedToken = Accounts._generateStampedLoginToken()
    let hashStampedToken = Accounts._hashStampedToken(stampedToken)
    Meteor.users.update(userId,
      { $push: { 'services.resume.loginTokens': hashStampedToken } }
    )

    return {
      userId: userId,
      token: stampedToken.token
    }
  }
})
