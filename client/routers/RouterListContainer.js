import RouterList from './RouterList'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Routers, Vehicles } from '/imports/collections'
import { Meteor } from 'meteor/meteor'
import { getValue } from '/imports/helpers'

const mapStateToProps = (state) => {
  return {
    filter: state.routerFilter,
    i18n: state.i18n,
    sort: state.listSort,
  }
}
export default connect(mapStateToProps)(createContainer(({ filter, sort }) => {
  sort = sort || { created_at: -1 }

  // merge vehicles and routers
  let subscription = Meteor.subscribe('routers.with_vehicles', filter, sort)
  let vehicles = Vehicles.find({}).fetch()
  let routers = Routers.find({}, { sort: sort }).map((router) => {
    router.vehicle = vehicles.filter((vehicle) => {
      return vehicle._id === router.vehicle_id
    })[0]
    return router
  })

  // sort by foregin key
  if (sort &&  Object.keys(sort)[0] === 'vehicle_number') {
    let sortKey = Object.keys(sort)[0].split('_').join('.')
    routers.sort((a, b) => {
      return ((getValue(a, sortKey) - getValue(b, sortKey))*sort['vehicle_number'])
    })
  }

  return {
    routers: routers,
    loading: !subscription.ready(),
  }
}, RouterList))
