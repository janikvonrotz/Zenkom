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

  ldapAuth.client.search(ldapAuth.searchOu, ldapAuth.searchQuery(options.email), (err, search) => {
    assert.ifError(err)

    search.on('searchEntry', (entry) => {
      dn.push(entry.objectName)
      return ldapAuth.profile = {
        firstname: entry.object.cn,
        lastname: entry.object.sn
      }
    })

    search.on('error', function(error){
      throw new Meteor.Error(500, "LDAP server error")
    })

    return search.on('end', function(){

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
    return undefined // don't handle
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

    console.log('LDAP login success.')
    return {
      userId: userId,
      token: stampedToken.token
    }
  }
})

// var client = ldap.createClient({
//   url: 'ldap://ldap.forumsys.com'
// })
//
// var bound = Meteor.bindEnvironment((callback) => {
//   return callback()
// })

// Accounts.registerLoginHandler('ldap', (loginRequest) => {
//
//   if (!loginRequest.ldap) {
//     return undefined // don't handle
//   }
//
//   console.log('Ldap login request received.', loginRequest)
//
//   let bindUser = (dn, email, password, profile) => {
//     client.bind(dn, password, (error) => {
//       if(error) throw error
//
//       bound(() => {
//         var userId = null
//         var user = Meteor.users.findOne({ "emails.address" : email })
//         if (!user) {
//           userId = Accounts.createUser({
//             email: email,
//             password: password,
//             profile: profile,
//             roles: ['user'],
//           })
//           Meteor.users.update(userId, { $set: { 'emails.0.verified': true } })
//         } else {
//           userId = user._id
//         }
//         let stampedToken = Accounts._generateStampedLoginToken()
//         let hashStampedToken = Accounts._hashStampedToken(stampedToken)
//         Meteor.users.update(userId,
//           { $push: { 'services.resume.loginTokens': hashStampedToken } }
//         )
//
//         console.log('Ldap login success.')
//         return {
//           userId: userId,
//           token: stampedToken.token
//         }
//       })
//     })
//   }
//
//   let options = {
//     filter: `(mail=${loginRequest.email})`,
//     scope: 'sub'
//   }
//
//   let clientSearchSync = Meteor.wrapAsync(client.search, this)
//   let result = clientSearchSync('dc=example,dc=com', options)
//   console.log(result)
//
//   client.search('dc=example,dc=com', options, (error, result) => {
//     if(error) throw error
//
//     result.on('searchEntry', (entry) => {
//       let profile = {
//         firstname: entry.object.cn,
//         lastname: entry.object.sn
//       }
//       bindUser(entry.object.dn, entry.object.mail, loginRequest.pass, profile)
//     })
//   })
// })

// Accounts.registerLoginHandler('admin', (loginRequest) => {
//
//   if(!loginRequest.admin) {
//     return undefined
//   }
//
//   console.log('Admin login request received.', loginRequest)
//
//   if(loginRequest.pass != 'password') {
//     return null
//   }
//
//   var userId = null
//   var user = Meteor.users.findOne({ "emails.address" : "admin@example.com" })
//   console.log(user)
//   if(!user) {
//     // userId = Meteor.users.insert({username: 'admin'})
//   } else {
//     userId = user._id
//   }
//
//   var stampedToken = Accounts._generateStampedLoginToken()
//   var hashStampedToken = Accounts._hashStampedToken(stampedToken)
//
//   Meteor.users.update(userId,
//     {$push: {'services.resume.loginTokens': hashStampedToken}}
//   )
//
//   console.log('Admin login success.')
//
//   return {
//     userId: userId,
//     token: stampedToken.token
//   }
// })
