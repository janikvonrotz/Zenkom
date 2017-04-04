let ldap = require('ldapjs')
let assert = require('assert')
let client = ldap.createClient({
    url: 'ldap://192.168.90.240'
})

// http://stackoverflow.com/questions/13255389/ldapjs-authentification-user-login-setup

let options = {
  filter: '(userPrincipalName=vernetztest@vbl.ch)',
  scope: 'sub'
}

let searchUser = {
  DN: 'CN=Fz vernetztest,OU=Test,OU=Services,OU=vblusers2,DC=vbl,DC=ch',
  Password: 'ZeNk609Om.',
}

client.bind(searchUser.DN, searchUser.Password, function(err) {
  assert.ifError(err)
  console.info('Bind Success!')

  client.search('dc=vbl,dc=ch', options, function(error, response) {
    assert.ifError(error)

    response.on('searchEntry', function(entry) {
      console.info('entry: ' + entry.dn)

      client.bind(entry.dn, 'ZeNk609Om.', function(bindError) {
        assert.ifError(bindError)
        console.info('Login Success!')
      })

    })

    response.on('searchReference', function(referral) {
      console.info('referral: ' + referral.uris.join())
    })

    response.on('error', function(searchError) {
      console.error('error: ' + searchError.message)
    })

    response.on('end', function(result) {
      console.info('status: ' + result.status)
    })

  })
})
