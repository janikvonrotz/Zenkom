module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'Zenkom',
      script: './bundle/main.js',
      env: {
        NODE_ENV: 'dev',
        MONGO_URL: 'mongodb://zenkom:dp8e36APuASgSWum7uLz@ds121190.mlab.com:21190/zenkom',
        ROOT_URL: 'https://zenkom.bitsherpa.com',
        PORT: 3000,
        METEOR_SETTINGS: {
          'private': {
            'ldap': {
              'url': 'ldap://ldap.forumsys.com',
              'base': 'dc=example,dc=com',
              'filter': '(mail={email})',
              'scope': 'sub',
              'searchUser': {}
            },
            'ravenServerDSN': 'https://079f53045f794b58938c5f086e2610a1:1c98746f48ae4bdfb15d7c8f231c62c8@sentry.io/147962'
          },
          'public': {
            'ravenClientDSN': 'https://079f53045f794b58938c5f086e2610a1@sentry.io/147962'
          }
        }
      },
      env_prod: {
      },
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    dev: {
      user: 'login',
      host: 'janikvonrotz.ch',
      key: '/keybase/private/janikvonrotz/ssh/id_rsa',
      ref: 'origin/develop',
      repo: 'git@gitlab.com:janikvonrotz/Zenkom.git',
      path: '/home/login/Zenkom',
      'post-deploy': 'rm -rf ./bundle && npm install --production && meteor build . --directory && cd ./bundle/programs/server && npm install --production && cd ../../.. && pm2 startOrRestart ecosystem.config.js',
    }
  }
}
