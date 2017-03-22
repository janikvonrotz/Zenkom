import { Meteor } from 'meteor/meteor'
import { Vehicles } from '/imports/collections'

export default () => {
  Meteor.publish('vehicles.list', (filter) => {
    let selector = {}
    if (filter === '') {
      selector = { archived: { $eq: false } }
    } else {
      selector = { archived: { $eq: false }, $or: [
        { _id: { $regex: filter } },
        { number: { $eq: Number(filter) } },
        { status: { $regex: filter } },
      ] }
    }
    return Vehicles.find(selector)
  })

  Meteor.publish('vehicles.item', (id) => {
    return Vehicles.find({ _id: id, archived: { $eq: false } })
  })
}
