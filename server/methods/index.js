import users from './users'
import routers from './routers'
import notifications from './notifications'
import vehicles from './vehicles'
import feedbacks from './feedbacks'
import dfis from './dfis'

export default () => {
  users()
  routers()
  vehicles()
  notifications()
  feedbacks()
  dfis()
}
