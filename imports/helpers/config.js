import { Meteor } from 'meteor/meteor'
import { objectAssign } from './index'

let acl = {
  // routers permissions
  'routers.read': [ 'admin', 'spec', 'tech', 'user' ],
  'routers.insert': [ 'admin', 'spec', 'tech' ],
  'routers.update': [ 'admin', 'spec', 'tech' ],
  'routers.remove': [ 'admin', 'spec' ],
  'routers.restore': [ 'admin' , 'spec' ],

  // vehicles permissions
  'vehicles.read': [ 'admin', 'spec', 'tech', 'user' ],
  'vehicles.insert': [ 'admin', 'spec', 'tech' ],
  'vehicles.update': [ 'admin', 'spec', 'tech' ],
  'vehicles.remove': [ 'admin', 'spec', 'tech' ],

  // dfis permissions
  'dfis.read': [ 'admin', 'spec', 'tech', 'user' ],
  'dfis.insert': [ 'admin', 'spec', 'tech' ],
  'dfis.update': [ 'admin', 'spec', 'tech' ],
  'dfis.remove': [ 'admin', 'spec', 'tech' ],

  // users permissions
  // 'users.read': [ 'admin', 'spec' ],
  // 'users.update_role': [ 'admin', 'spec' ],
  'users.read': [ 'admin', 'spec', 'tech', 'user' ],
  'users.update_role': [ 'admin', 'spec', 'tech', 'user' ],
  'users.update_settings': [ 'admin', 'spec', 'tech' ],
  'users.update_profile': [ 'admin', 'spec', 'tech', 'user' ],

  // notification permissions
  'notifications.read': [ 'admin', 'spec', 'tech' ],
  'notifications.receive': [ 'admin', 'spec', 'tech' ],
  'notifications.insert': [ 'admin', 'spec', 'tech' ],
  'notifications.remove': [ 'admin', 'spec', 'tech' ],

  // feedbacks permissions
  'feedbacks.insert': [ 'admin', 'spec', 'tech', 'user' ],
}

export default objectAssign(Meteor.settings.private, Meteor.settings.public, { acl: acl })
