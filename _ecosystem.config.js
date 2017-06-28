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
        NODE_ENV: 'production',
        MONGO_URL: 'mongodb://zenkom:password@ds121190.mlab.com:21190/zenkom',
        ROOT_URL: 'https://example.com',
        PORT: 3000,
        METEOR_SETTINGS: {
          'private': {
            'ldap': {
              'url': 'ldap://ldap.forumsys.com',
              'base': 'dc=example,dc=com',
              'filter': '(mail={email})',
              'scope': 'sub',
            },
            'mail': {
              'notificationFrom': 'notifications@example.com',
            },
          },
          'public': {
            'disableAccessContol': false,
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
      host: 'example.com',
      key: '/keybase/private/username/ssh/id_rsa',
      ref: 'origin/develop',
      repo: 'git@gitlab.com:username/Zenkom.git',
      path: '/home/login/Zenkom',
      'post-deploy': 'rm -rf ./bundle && npm install --production && meteor build . --directory && cd ./bundle/programs/server && npm install --production && cd ../../.. && pm2 startOrRestart ecosystem.config.js',
    }
  }
}
