import { combineReducers } from 'redux'
import headerTitle from './headerTitle'
import notification from './notification'
import user from './user'
import postFilter from './postFilter'
import i18n from './i18n'

const zenkomApp = combineReducers({
  headerTitle,
  notification,
  user,
  postFilter,
  i18n
})

export default zenkomApp
