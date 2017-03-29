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
    },
    searchUser: config.ldap.searchUser,
  }

  ldapAuth.checkAccount = (options) => {
    options = options || {}

    ldapAuth.client = ldap.createClient({
      url: ldapAuth.url
    })

    let dn = []
    let future = new Future()

    // use different auth method for vbl domain
    if (ldapAuth.searchOu === 'dc=vbl,dc=ch') {

      ldapAuth.client.bind(ldapAuth.searchUser.dn, ldapAuth.searchUser.password, (searchBindError) => {
        assert.ifError(searchBindError)

        ldapAuth.client.search(ldapAuth.searchOu, ldapAuth.searchQuery(options.email), (searchError, result) => {
          assert.ifError(searchError)

          result.on('searchEntry', (entry) => {
            dn.push(entry.objectName)
            return ldapAuth.profile = {
              firstname: entry.object.givenName,
              lastname: entry.object.sn,
              name: `${entry.object.displayName}`,
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
      })
      return future.wait()

    } else {

      ldapAuth.client.search(ldapAuth.searchOu, ldapAuth.searchQuery(options.email), (error, result) => {
        assert.ifError(error)

        result.on('searchEntry', (entry) => {
          dn.push(entry.objectName)
          return ldapAuth.profile = {
            firstname: entry.object.cn,
            lastname: entry.object.sn,
            name: `${entry.object.cn}`,
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
          password: loginRequest.pass,
          profile: ldapAuth.profile,
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
