import { combineReducers } from 'redux'
import headerTitle from './headerTitle'
import notification from './notification'
import user from './user'

const zenkomApp = combineReducers({
  headerTitle,
  notification,
  user
})

export default zenkomApp
