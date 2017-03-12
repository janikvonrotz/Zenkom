import routers from './routers'
import notifications from './notifications'
import vehicles from './vehicles'
import users from './users'

export default () => {
  routers()
  notifications()
  vehicles()
  users()
}
