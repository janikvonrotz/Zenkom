import { Meteor } from 'meteor/meteor'
import { Notifications } from '/imports/collections'

export default () => {
  Meteor.publish('notifications.list', function(filter, limit) {
    let { userId } = this

    // declare options and selector
    let options = {}
    let selector = {}

    // update options
    if(limit && limit != 'all'){
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
    
    return Notifications.find(selector, options)
  })

  Meteor.publish('notifications.item', (id) => {
    return Notifications.find({ _id: id })
  })
}
