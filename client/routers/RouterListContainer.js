import RouterList from './RouterList'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Routers } from '/imports/collections'
import { Meteor } from 'meteor/meteor'

const mapStateToProps = (state) => {
  return {
    filter: state.routerFilter,
    i18n: state.i18n,
  }
}
export default connect(mapStateToProps)(createContainer(({ filter }) => {
  console.log(filter)
  let subscription = Meteor.subscribe('routers.list', filter)
  return {
    routers: Routers.find({}, { sort: { created_at: -1 } }).fetch(),
    loading: !subscription.ready(),
  }
}, RouterList))
