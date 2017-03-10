import routers from './routers'
import notifications from './notifications'
import vehicles from './vehicles'

export default () => {
  routers()
  notifications()
  vehicles()
}
