import { combineReducers } from 'redux'
import headerTitle from './headerTitle'
import notification from './notification'
import user from './user'
import i18n from './i18n'
import routerFilter from './routerFilter'
import vehicleFilter from './vehicleFilter'
import vehicleStatusOptions from './vehicleStatusOptions'
import serverNotificationOptions from './serverNotificationOptions'
import notificationChannelOptions from './notificationChannelOptions'
import userFilter from './userFilter'
import userRoleOptions from './userRoleOptions'

const zenkomApp = combineReducers({
  headerTitle,
  notification,
  user,
  i18n,
  routerFilter,
  vehicleFilter,
  vehicleStatusOptions,
  serverNotificationOptions,
  notificationChannelOptions,
  userFilter,
  userRoleOptions,
})

export default zenkomApp
