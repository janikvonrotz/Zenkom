import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Notifications } from '/imports/collections'
import { getFullname } from '/imports/helpers'

export default () => {
  Meteor.methods({
    'notifications.insert'(object) {
      object.created_at = new Date()
      object.created_by = getFullname()
      return Notifications.insert(object)
    },

    'notifications.update'(object) {
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
