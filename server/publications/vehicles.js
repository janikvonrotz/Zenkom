import { Meteor } from 'meteor/meteor'
import { Vehicles } from '/imports/collections'

export default () => {
  Meteor.publish('vehicles.list', (filter, sort, limit) => {

    // set selector and options
    let selector = {}
    let options = {}
    if (sort) {
      options.sort = sort
    }
    if (limit && limit != 'all') {
      options.limit = limit
    }

    if (filter === '') {
      selector = { archived: { $eq: false } }
    } else {
      selector = { archived: { $eq: false }, $or: [
        { _id: { $regex: filter } },
        { number: { $eq: Number(filter) } },
        { status: { $regex: filter } },
      ] }
    }
    return Vehicles.find(selector, options)
  })

  Meteor.publish('vehicles.item', (id) => {
    return Vehicles.find({ _id: id, archived: { $eq: false } })
  })
}
