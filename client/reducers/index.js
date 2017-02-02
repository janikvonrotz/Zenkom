import { combineReducers } from 'redux'
import headerTitle from './headerTitle'
import notification from './notification'

const zenkomApp = combineReducers({
  headerTitle,
  notification
})

export default zenkomApp
