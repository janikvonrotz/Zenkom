import { Meteor } from 'meteor/meteor'
import { Routers, Vehicles } from '/imports/collections'
import { isAllowed } from '/imports/helpers'

export default () => {
  Meteor.publish('routers.with_vehicles', function(filter, sort, limit) {
    let routerSelector = {}, vehicleSelector = {}
    let routerOptions = {}, vehicleOptions = {}
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
    } else {

      // filter vehicles
      let vehicleIds = Vehicles.find({ number: { $eq: Number(filter) }, archived: { $eq: false } }).map((vehicle) => {
        return vehicle._id
      })
      routerSelector = { archived: { $eq: false }, $or: [
        { _id: { $regex: filter } },
        { hostname: { $regex: filter } },
        { vehicle_id: { $in: vehicleIds } },
        { dfi_name: { $regex: filter } },
        { version: { $regex: filter } },
        { type: { $regex: filter } },
        { ip_router: { $regex: filter } },
        { ip_cashbox: { $regex: filter } },
      ] }

      vehicleSelector = { archived: { $eq: false } }
      vehicleOptions = {
        fields: {
          _id: 1,
          number: 1,
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
      ]
    } else {
      this.stop()
      return
    }
  })

  Meteor.publish('routers.item_with_vehicles', function(id) {

    let routerSelector = { _id: id, archived: { $eq: false } }
    let vehicleSelector = { archived: { $eq: false } }
    let vehicleOptions = {
      fields: {
        _id: 1,
        number: 1,
      }
    }

    // check permissions
    let user = Meteor.users.findOne(this.userId)
    let roles = user ? user.roles : null
    if (isAllowed('routers.read', roles)) {
      return [
        Vehicles.find(vehicleSelector, vehicleOptions),
        Routers.find(routerSelector),
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
