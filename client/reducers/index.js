import { combineReducers } from 'redux'
import headerTitle from './headerTitle'
import notification from './notification'
import user from './user'
import i18n from './i18n'
import routerFilter from './routerFilter'
import vehicleFilter from './vehicleFilter'
import vehicleStatusOptions from './vehicleStatusOptions'

const zenkomApp = combineReducers({
  headerTitle,
  notification,
  user,
  i18n,
  routerFilter,
  vehicleFilter,
  vehicleStatusOptions,
})

export default zenkomApp
