import { Meteor } from 'meteor/meteor'
import { Dfis } from '/imports/collections'
import { isAllowed } from '/imports/helpers'

export default () => {
  Meteor.publish('dfis.list', function(filter, sort, limit) {

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
        { description: { $regex: filter } },
        { row: { $regex: filter } },
        { row_type: { $regex: filter } },
        { location: { $regex: filter } },
      ] }
    }

    // check permissions
    let user = Meteor.users.findOne(this.userId)
    let roles = user ? user.roles : null
    if (isAllowed('dfis.read', roles)) {
      return Dfis.find(selector, options)
    } else {
      this.stop()
      return
    }
  })

  Meteor.publish('dfis.item', function(id) {

    // check permissions
    let user = Meteor.users.findOne(this.userId)
    let roles = user ? user.roles : null
    if (isAllowed('dfis.read', roles)) {
      return Dfis.find({ _id: id, archived: { $eq: false } })
    } else {
      this.stop()
      return
    }
  })
}
