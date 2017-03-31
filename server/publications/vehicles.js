import { Meteor } from 'meteor/meteor'
import { Vehicles } from '/imports/collections'
import { isAllowed } from '/imports/helpers'

export default () => {
  Meteor.publish('vehicles.list', function(filter, sort, limit) {

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
        { number: { $eq: Number(filter) } },
        { status: { $regex: filter } },
      ] }
    }

    // check permissions
    let user = Meteor.users.findOne(this.userId)
    let roles = user ? user.roles : null
    if (isAllowed('vehicles.read', roles)) {
      return Vehicles.find(selector, options)
    } else {
      this.stop()
      return
    }
  })

  Meteor.publish('vehicles.item', function(id) {

    // check permissions
    let user = Meteor.users.findOne(this.userId)
    let roles = user ? user.roles : null
    if (isAllowed('vehicles.read', roles)) {
      return Vehicles.find({ _id: id, archived: { $eq: false } })
    } else {
      this.stop()
      return
    }
  })
}
