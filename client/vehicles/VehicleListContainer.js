import VehicleList from './VehicleList'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Vehicles } from '/imports/collections'
import { Meteor } from 'meteor/meteor'

const mapStateToProps = (state) => {
  return {
    filter: state.vehicleFilter,
    i18n: state.i18n,
    sort: state.listSort,
  }
}
export default connect(mapStateToProps)(createContainer(({ filter, sort }) => {
  sort = sort || { number: -1 }

  let subscription = Meteor.subscribe('vehicles.list', filter, sort)
  return {
    vehicles: Vehicles.find({}, { sort: sort }).fetch(),
    loading: !subscription.ready(),
  }
}, VehicleList))
