import { Meteor } from 'meteor/meteor'
import { Notifications } from '/imports/collections'

export default () => {
  Meteor.publish('notifications.list', function(filter) {
    let { userId } = this
    if (filter === '') {
      return Notifications.find({ receivers: { $in: [ userId ] } })
    } else {
      return Notifications.find({  receivers: { $in: [ userId ] }, $and: [
        { $or: [
          { _id: { $regex: filter } },
          { subject: { $regex: filter } },
          { content: { $regex: filter } },
        ] }
      ] })
    }
  })

  Meteor.publish('notifications.item', (id) => {
    return Notifications.find({ _id: id })
  })
}
