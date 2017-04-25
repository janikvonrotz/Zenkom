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
    limit: state.routerListLimit,
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
    routers.sort((a, b) => {
      let aValue = getValue(a, sortKey)
      let bValue = getValue(b, sortKey)

      // different sort for number and string
      if (typeof aValue === 'number' ) {
        return ((aValue - bValue)*sort[sortForeignKey])
      } else {
        return ((aValue < bValue)*sort[sortForeignKey])
      }
    })
  }

  return {
    routers: routers,
    loading: !subscription.ready(),
  }
}, RouterList))
