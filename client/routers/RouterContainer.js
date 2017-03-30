import Router from './Router'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Routers, Vehicles, Dfis } from '/imports/collections'
import { Meteor } from 'meteor/meteor'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    i18n: state.i18n,
    statusOptions: state.routerStatusOptions,
    companyOptions: state.routerCompanyOptions,
    profileOptions: state.routerProfileOptions,
    typeOptions: state.routerTypeOptions,
    statistic: state.routerStatistic,
  }
}

export default connect(mapStateToProps)(createContainer(({ params }) => {
  let subscription = Meteor.subscribe('routers.item_with_vehicles_dfi', params.id)
  let router = Routers.findOne(params.id) || {}
  let vehicles = Vehicles.find({}, { sort: { number: -1 } }).fetch()
  let dfis = Dfis.find({}, { sort: { description: -1 } }).fetch()

  return {
    router: router,
    vehicle: vehicles.filter((vehicle) => {
      return vehicle._id === (router.vehicle_id || '')
    })[0],
    dfi: dfis.filter((dfi) => {
      return dfi._id === (router.dfi_id || '')
    })[0],
    vehicles: vehicles,
    dfis: dfis,
    loading: !subscription.ready(),
  }
}, Router))
