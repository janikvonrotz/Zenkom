import { Meteor } from 'meteor/meteor'
import { Notifications } from '/imports/collections'

export default () => {
  Meteor.publish('notifications.list', (filter) => {
    if (filter === '') {
      return Notifications.find({})
    } else {
      return Notifications.find({ $or: [
        { _id: { $regex: filter } },
        { subject: { $regex: filter } },
        { content: { $regex: filter } },
      ] })
    }
  })

  Meteor.publish('notifications.item', (id) => {
    return Notifications.find({ _id: id })
  })
}
