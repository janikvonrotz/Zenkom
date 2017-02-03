import ldap from 'ldapjs'
import assert from 'assert'
import { Accounts } from 'meteor/accounts-base'

var client = ldap.createClient({
  url: 'ldap://ldap.forumsys.com'
})

var bound = Meteor.bindEnvironment((callback) => {
  return callback()
})

Accounts.registerLoginHandler('ldap', (loginRequest) => {

  console.log('Login request received.', loginRequest)

  if (!loginRequest.ldap) {
    return undefined // don't handle
  }

  let bindUser = (dn, email, password, profile) => {
    client.bind(dn, password, (error) => {
      if(error) throw error

      bound(() => {
        var userId = null
        var user = Meteor.users.findOne({ "emails.address" : email })
        if (!user) {
          userId = Accounts.createUser({
            email: email,
            password: password,
            profile: profile,
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

        console.log('Loggin')
        return {
          id: userId,
          token: stampedToken.token
        }
      })
    })
  }

  let options = {
    filter: `(mail=${loginRequest.email})`,
    scope: 'sub'
  }

  client.search('dc=example,dc=com', options, (error, result) => {
    if(error) throw error

    result.on('searchEntry', (entry) => {
      let profile = {
        firstname: entry.object.cn,
        lastname: entry.object.sn
      }
      bindUser(entry.object.dn, entry.object.mail, loginRequest.pass, profile)
    })
  })
})
