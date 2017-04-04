import UserList from './UserList'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Users } from '/imports/collections'

const mapStateToProps = (state) => {
  return {
    filter: state.userFilter,
    i18n: state.i18n,
    roleOptions: state.userRoleOptions,
    sort: state.listSort,
    limit: state.listLimit,
  }
}
export default connect(mapStateToProps)(createContainer(({ filter, sort, limit }) => {

  // map sort key to specific field path
  sort = sort || { 'name': 1 }
  let sortKey = Object.keys(sort)[0]
  let sortValue = sort[sortKey]
  let mapKey = {
    'name': 'profile.name',
    'firstname': 'profile.firstname',
    'lastname': 'profile.lastname',
    'email': 'emails.0.address',
    'role': 'roles.0',
  }
  sort = {}
  sort[mapKey[sortKey] || sortKey] = sortValue

  let subscription = Meteor.subscribe('users.list', filter, sort, limit)
  return {
    users: Users.find({}, { sort: sort }).fetch(),
    loading: !subscription.ready(),
  }
}, UserList))
