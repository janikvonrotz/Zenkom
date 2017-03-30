import RouterList from './RouterList'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Routers, Vehicles, Dfis } from '/imports/collections'
import { Meteor } from 'meteor/meteor'
import { getValue } from '/imports/helpers'

const mapStateToProps = (state) => {
  return {
    filter: state.routerFilter,
    i18n: state.i18n,
    sort: state.listSort,
    limit: state.listLimit,
  }
}
export default connect(mapStateToProps)(createContainer(({ filter, sort, limit }) => {
  sort = sort || { created_at: -1 }

  // merge vehicles and dfis with routers
  let subscription = Meteor.subscribe('routers.with_vehicles_dfis', filter, sort, limit)
  let vehicles = Vehicles.find({}).fetch()
  let dfis = Dfis.find({}).fetch()
  let routers = Routers.find({}, { sort: sort }).map((router) => {
    router.vehicle = vehicles.filter((vehicle) => {
      return vehicle._id === router.vehicle_id
    })[0]
    router.dfi = dfis.filter((dfi) => {
      return dfi._id === router.dfi_id
    })[0]
    return router
  })

  // sort by foreign key
  if (sort && ([ 'vehicle_number', 'dfi_description' ].indexOf(Object.keys(sort)[0]) != -1)) {
    let sortForeignKey = Object.keys(sort)[0]
    let sortKey = Object.keys(sort)[0].split('_').join('.')
    console.log(sort, sortForeignKey, sortKey)
    routers.sort((a, b) => {
      console.log(a, b)
      return ((getValue(a, sortKey) - getValue(b, sortKey))*sort[sortForeignKey])
    })
  }

  return {
    routers: routers,
    loading: !subscription.ready(),
  }
}, RouterList))
