import RouterList from './RouterList'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Routers, Vehicles } from '/imports/collections'
import { Meteor } from 'meteor/meteor'

const mapStateToProps = (state) => {
  return {
    filter: state.routerFilter,
    i18n: state.i18n,
  }
}
export default connect(mapStateToProps)(createContainer(({ filter }) => {

  // merge vehicles and routers
  let subscription = Meteor.subscribe('routers.with_vehicles', filter)
  let vehicles = Vehicles.find({}).fetch()

  return {
    routers: Routers.find({}, { sort: { created_at: -1 } }).map((router) => {
      router.vehicle = vehicles.filter((vehicle) => {
        return vehicle._id === router.vehicle_id
      })[0]
      return router
    }),
    loading: !subscription.ready(),
  }
}, RouterList))
