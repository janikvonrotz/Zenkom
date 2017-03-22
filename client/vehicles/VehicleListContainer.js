import VehicleList from './VehicleList'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Vehicles } from '/imports/collections'
import { Meteor } from 'meteor/meteor'

const mapStateToProps = (state) => {
  return {
    filter: state.vehicleFilter,
    i18n: state.i18n,
  }
}
export default connect(mapStateToProps)(createContainer(({ filter }) => {
  let subscription = Meteor.subscribe('vehicles.list', filter)
  return {
    vehicles: Vehicles.find({}, { sort: { number: -1 } }).fetch(),
    loading: !subscription.ready(),
  }
}, VehicleList))
