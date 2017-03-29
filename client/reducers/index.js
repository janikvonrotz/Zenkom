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
import routerStatusOptions from './routerStatusOptions'
import routerProfileOptions from './routerProfileOptions'
import routerCompanyOptions from './routerCompanyOptions'
import routerTypeOptions from './routerTypeOptions'
import notificationFilter from './notificationFilter'
import listLimit from './listLimit'
import listSort from './listSort'
import routerStatistic from './routerStatistic'
import dfiFilter from './dfiFilter'

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
  routerStatusOptions,
  routerProfileOptions,
  routerCompanyOptions,
  routerTypeOptions,
  notificationFilter,
  listLimit,
  listSort,
  routerStatistic,
  dfiFilter,
})

export default zenkomApp
