import users from './users'
import routers from './routers'
import notifications from './notifications'
import vehicles from './vehicles'
import feedbacks from './feedbacks'

export default () => {
  users()
  routers()
  vehicles()
  notifications()
  feedbacks()
}
