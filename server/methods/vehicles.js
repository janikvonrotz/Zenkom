import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Vehicles } from '/imports/collections'
import { getFullname } from '/imports/helpers'

export default () => {
  Meteor.methods({
    'vehicles.insert'(object) {
      object.created_at = new Date()
      object.created_by = getFullname()
      return Vehicles.insert(object)
    },

    'vehicles.update'(object) {
      object.updated_at = new Date()
      object.updated_by = getFullname()
      let { _id } = object
      delete object._id
      Vehicles.update( _id, { $set: object } )
    },

    'vehicles.remove'(id) {
      check(id, String)
      Vehicles.remove(id)
    },

  })
}
