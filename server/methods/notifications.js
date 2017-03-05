import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Notifications } from '/imports/collections'

export default () => {
  Meteor.methods({
    'notifications.insert'(object) {
      object.updated_at = new Date()
      object.created_at = new Date()
      return Notifications.insert(object)
    },

    'notifications.update'(object) {
      object.updated_at = new Date()
      let { _id } = object
      delete object._id
      Notifications.update( _id, { $set: object } )
    },

    'notifications.remove'(id) {
      check(id, String)
      Notifications.remove(id)
    },

  })
}
