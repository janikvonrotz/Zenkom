import { Meteor } from 'meteor/meteor'
import { Routers } from '/imports/collections'

export default () => {
  Meteor.publish('routers.list', (filter) => {
    if (filter === '') {
      return Routers.find({})
    } else {
      let filterNumber = Number(filter)
      return Routers.find({ $or: [
        { _id: { $regex: filter } },
        { vehicle_id: { $eq: filterNumber } },
        { dfi_name: { $regex: filter } },
      ] })
    }
  })

  Meteor.publish('routers.item', (id) => {
    return Routers.find({ _id: id })
  })
}
