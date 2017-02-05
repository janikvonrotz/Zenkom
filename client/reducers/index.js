import { combineReducers } from 'redux'
import headerTitle from './headerTitle'
import notification from './notification'
import user from './user'
import postFilter from './postFilter'

const zenkomApp = combineReducers({
  headerTitle,
  notification,
  user,
  postFilter,
})

export default zenkomApp
