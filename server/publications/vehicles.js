import { Meteor } from 'meteor/meteor'
import { Vehicles } from '/imports/collections'

export default () => {
  Meteor.publish('vehicles.list', (filter) => {
    if (filter === '') {
      return Vehicles.find({})
    } else {
      return Vehicles.find({ $or: [
        { _id: { $regex: filter } },
        { number: { $eq: Number(filter) } },
        { status: { $regex: filter } },
      ] })
    }
  })

  Meteor.publish('vehicles.item', (id) => {
    return Vehicles.find({ _id: id })
  })
}
