import RouterLink from './RouterLink'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Routers } from '/imports/collections'
import { Meteor } from 'meteor/meteor'

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
  }
}

export default connect(mapStateToProps)(createContainer(({ vehicleId, dfiId }) => {
  let subscription = vehicleId ? Meteor.subscribe('routers.list', { vehicle_id: vehicleId }) : null
  subscription = dfiId ? Meteor.subscribe('routers.list', { dfi_id: dfiId }) : subscription

  return {
    router: Routers.findOne(),
    loading: !subscription.ready(),
  }
}, RouterLink))
