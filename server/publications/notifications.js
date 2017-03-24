import { Meteor } from 'meteor/meteor'
import { Notifications } from '/imports/collections'
import { isAllowed } from '/imports/helpers'

export default () => {
  Meteor.publish('notifications.list', function(filter, limit) {
    let { userId } = this

    // declare options and selector
    let options = {}
    let selector = {}

    // update options
    if (limit && limit != 'all') {
      options.sort = { created_at: -1 }
      options.limit = limit
    }

    // update selector
    if (filter === '') {
      selector = { receivers: { $in: [ userId ] } }
    } else {
      selector = {  receivers: { $in: [ userId ] }, $and: [
        { $or: [
          { _id: { $regex: filter } },
          { subject: { $regex: filter } },
          { content: { $regex: filter } },
        ] }
      ] }
    }

    // check permissions
    let user = Meteor.users.findOne(this.userId)
    let roles = user ? user.roles : null
    if (isAllowed('notifications.read', roles)) {
      return Notifications.find(selector, options)
    } else {
      this.stop()
      return
    }
  })

  Meteor.publish('notifications.item_latest', function() {
    let selector = {}
    let options = { sort: { created_at: -1 }, limit: 1 }

    // check permissions
    let user = Meteor.users.findOne(this.userId)
    let roles = user ? user.roles : null
    if (isAllowed('notifications.read', roles)) {
      return Notifications.find(selector, options)
    } else {
      this.stop()
      return
    }
  })
}
