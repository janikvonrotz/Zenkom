import ldap from 'ldapjs'
import assert from 'assert'
import { Accounts } from 'meteor/accounts-base'
import Future from 'fibers/future'
import { config } from '/imports/helpers'

let ldapJs = () => {

  let ldapAuth = {
    url: config.ldap.url,
    searchOu: config.ldap.base,
    searchQuery: (email) => {
      return {
        filter: config.ldap.filter.replace('{email}', email),
        scope: config.ldap.scope,
      }
    }
  }

  ldapAuth.checkAccount = (options) => {
    options = options || {}

    ldapAuth.client = ldap.createClient({
      url: ldapAuth.url
    })

    let dn = []
    let future = new Future()

    ldapAuth.client.search(ldapAuth.searchOu, ldapAuth.searchQuery(options.email), (error, result) => {
      assert.ifError(error)

      result.on('searchEntry', (entry) => {
        dn.push(entry.objectName)
        return ldapAuth.profile = {
          firstname: entry.object.cn,
          lastname: entry.object.sn
        }
      })

      result.on('error', () => {
        throw new Meteor.Error(500, 'LDAP server error')
      })

      return result.on('end', () => {

        if (dn.length === 0) {
          future['return'](false)
          return false
        }

        return ldapAuth.client.bind(dn[0], options.pass, (bindError) => {

          if (bindError) {
            future['return'](false)
            return false
          }

          return ldapAuth.client.unbind((unbindError) => {
            assert.ifError(unbindError)
            return future['return'](!unbindError)
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
      let userId = null
      let user = Meteor.users.findOne({ 'emails.address' : loginRequest.email })
      if (!user) {
        userId = Accounts.createUser({
          email: loginRequest.email,
          password: loginRequest.password,
          profile: ldapAuth.profile,
          roles: [ 'user' ],
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
}

export default ldapJs
