import { Meteor } from 'meteor/meteor'
import { Routers, Vehicles } from '/imports/collections'

export default () => {
  Meteor.publish('routers.with_vehicles', (filter) => {
    if (filter === '') {
      return [
        Routers.find({ archived: { $eq: false } }),
        Vehicles.find({ archived: { $eq: false } }),
      ]
    } else {

      // filter vehicles
      let vehicleIds = Vehicles.find({ number: { $eq: Number(filter) }, archived: { $eq: false } }).map((vehicle) => {
        return vehicle._id
      })

      // publish routers and vehicles
      return [
        Routers.find({ archived: { $eq: false }, $or: [
          { _id: { $regex: filter } },
          { hostname: { $regex: filter } },
          { vehicle_id: { $in: vehicleIds } },
          { dfi_name: { $regex: filter } },
          { router_version: { $regex: filter } },
          { type: { $regex: filter } },
          { ip_router: { $regex: filter } },
          { ip_cashbox: { $regex: filter } },
        ] }),
        Vehicles.find({ archived: { $eq: false } }, {
          fields: {
            _id: 1,
            number: 1,
          }
        }),
      ]
    }
  })

  Meteor.publish('routers.item_with_vehicles', (id) => {
    return [
      Vehicles.find({ archived: { $eq: false } }, {
        fields: {
          _id: 1,
          number: 1,
        }
      }),
      Routers.find({ _id: id, archived: { $eq: false } }),
    ]
  })

  Meteor.publish('routers.item', (id) => {
    return Routers.find({ _id: id, archived: { $eq: false } })
  })
}
