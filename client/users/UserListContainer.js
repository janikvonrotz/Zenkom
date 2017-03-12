import UserList from './UserList'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

const mapStateToProps = (state) => {
  return {
    filter: state.userFilter,
    i18n: state.i18n,
    roleOptions: state.userRoleOptions,
  }
}
export default connect(mapStateToProps)(createContainer(({ filter }) => {
  let subscription = Meteor.subscribe('users.list', filter)
  return {
    users: Meteor.users.find({}, { sort: { created_at: -1 } }).fetch(),
    loading: !subscription.ready(),
  }
}, UserList))
