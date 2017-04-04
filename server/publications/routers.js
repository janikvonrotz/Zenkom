import { Meteor } from 'meteor/meteor'
import { Routers, Vehicles, Dfis } from '/imports/collections'
import { isAllowed } from '/imports/helpers'

export default () => {

  Meteor.publish('routers.list', function(selector = {}) {

    // check permissions
    let user = Meteor.users.findOne(this.userId)
    let roles = user ? user.roles : null
    if (isAllowed('routers.read', roles)) {
      return Routers.find(selector)
    } else {
      this.stop()
      return
    }
  })

  Meteor.publish('routers.with_vehicles_dfis', function(filter, sort, limit) {
    let routerSelector = {}, vehicleSelector = {}, dfiSelector = {}
    let routerOptions = {}, vehicleOptions = {}, dfiOptions = {}
    if (sort) {
      routerOptions.sort = sort
    }
    if (limit && limit != 'all') {
      routerOptions.limit = limit
    }

    if (filter === '') {
      routerSelector = { archived: { $eq: false } }

      vehicleSelector = { archived: { $eq: false } }
      vehicleOptions = {
        fields: {
          _id: 1,
          number: 1,
        }
      }

      dfiSelector = { archived: { $eq: false } }
      dfiOptions = {
        fields: {
          _id: 1,
          description: 1,
        }
      }
    } else {

      // filter vehicles
      let vehicleIds = Vehicles.find({ number: { $eq: Number(filter) }, archived: { $eq: false } }).map((vehicle) => {
        return vehicle._id
      })
      // filter dfis
      let dfiIds = Dfis.find({ description: { $regex: filter }, archived: { $eq: false } }).map((dfi) => {
        return dfi._id
      })

      routerSelector = { archived: { $eq: false }, $or: [
        { hostname: { $regex: filter } },
        { vehicle_id: { $in: vehicleIds } },
        { dfi_id: { $in: dfiIds } },
        { type: { $regex: filter } },
        { ip_router: { $regex: filter } },
        { ip_cashbox: { $regex: filter } },
        { sim1: { $regex: filter } },
        { sim2: { $regex: filter } },
        { sim_itt: { $regex: filter } },
      ] }

      vehicleSelector = { archived: { $eq: false } }
      vehicleOptions = {
        fields: {
          _id: 1,
          number: 1,
        }
      }

      dfiSelector = { archived: { $eq: false } }
      dfiOptions = {
        fields: {
          _id: 1,
          description: 1,
        }
      }
    }

    // check permissions
    let user = Meteor.users.findOne(this.userId)
    let roles = user ? user.roles : null
    if (isAllowed('routers.read', roles)) {
      return [
        Routers.find(routerSelector, routerOptions),
        Vehicles.find(vehicleSelector, vehicleOptions),
        Dfis.find(dfiSelector, dfiOptions),
      ]
    } else {
      this.stop()
      return
    }
  })

  Meteor.publish('routers.item_with_vehicles_dfi', function(id) {

    let routerSelector = { _id: id, archived: { $eq: false } }
    let vehicleSelector = { archived: { $eq: false } }
    let vehicleOptions = {
      fields: {
        _id: 1,
        number: 1,
      }
    }
    let dfiSelector = { archived: { $eq: false } }
    let dfiOptions = {
      fields: {
        _id: 1,
        description: 1,
      }
    }

    // check permissions
    let user = Meteor.users.findOne(this.userId)
    let roles = user ? user.roles : null
    if (isAllowed('routers.read', roles)) {
      return [
        Vehicles.find(vehicleSelector, vehicleOptions),
        Routers.find(routerSelector),
        Dfis.find(dfiSelector, dfiOptions),
      ]
    } else {
      this.stop()
      return
    }
  })

  Meteor.publish('routers.item', function(id) {

    // check permissions
    let user = Meteor.users.findOne(this.userId)
    let roles = user ? user.roles : null
    if (isAllowed('routers.read', roles)) {
      return Routers.find({ _id: id, archived: { $eq: false } })
    } else {
      this.stop()
      return
    }
  })
}
