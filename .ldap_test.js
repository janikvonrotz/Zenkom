var ldap = require('ldapjs');
var assert = require('assert');
var client = ldap.createClient({
    url: 'ldap://ldap.forumsys.com'
});

// http://stackoverflow.com/questions/13255389/ldapjs-authentification-user-login-setup

var opts = {
  filter: '(mail=einstein@ldap.forumsys.com)',
  scope: 'sub'
};

function bind(dn, password){
  client.bind(dn, password, function(err) {
    assert.ifError(err);
  });
}

client.search('dc=example,dc=com', opts, function(err, res) {
  assert.ifError(err);

  res.on('searchEntry', function(entry) {
    console.log('entry: ' + JSON.stringify(entry.object));
    bind(entry.dn, 'password')
  });
  res.on('searchReference', function(referral) {
    console.log('referral: ' + referral.uris.join());
  });
  res.on('error', function(err) {
    console.error('error: ' + err.message);
  });
  res.on('end', function(result) {
    console.log('status: ' + result.status);
  });
});
