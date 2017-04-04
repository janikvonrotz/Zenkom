import routers from './routers'
import notifications from './notifications'
import vehicles from './vehicles'
import users from './users'
import dfis from './dfis'

export default () => {
  routers()
  notifications()
  vehicles()
  users()
  dfis()
}
