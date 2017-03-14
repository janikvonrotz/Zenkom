import { Meteor } from 'meteor/meteor'

let acl = {
  'routers.read': [ 'tech', 'spec', 'admin' ],
  'routers.insert': [ 'tech', 'spec', 'admin' ],
  'routers.update': [ 'tech', 'spec', 'admin' ],
  'routers.remove': [ 'tech', 'spec', 'admin' ],
  'routers.restore': [ 'spec', 'admin' ],
  'routers.get_statistic_url': [ 'tech', 'spec', 'admin' ],
}

export default Object.assign(Meteor.settings.private, Meteor.settings.public, { acl: acl })
