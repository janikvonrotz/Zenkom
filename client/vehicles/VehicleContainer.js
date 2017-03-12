import Vehicle from './Vehicle'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Vehicles } from '/imports/collections'
import { Meteor } from 'meteor/meteor'

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    statusOptions: state.vehicleStatusOptions,
  }
}

export default connect(mapStateToProps)(createContainer(({ params }) => {
  let subscription = Meteor.subscribe('vehicles.item', params.id)

  return {
    vehicle: Vehicles.findOne(params.id),
    loading: !subscription.ready(),
  }
}, Vehicle))
