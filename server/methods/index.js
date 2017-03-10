import users from './users'
import routers from './routers'
import notifications from './notifications'
import feedbacks from './feedbacks'

export default () => {
  users()
  routers()
  notifications()
  feedbacks()
}
