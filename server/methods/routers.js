import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Routers } from '/imports/collections'
import { RouterSchema } from '/imports/schemas'
import { Random } from 'meteor/random'

export default () => {
  Meteor.methods({
    'routers.insert'(object) {
      object.created_at = new Date()
      object.created_by = `${ Meteor.user().profile.firstname } ${ Meteor.user().profile.lastname }`
      object.history = []
      object.archived = false
      return Routers.insert(object)
    },

    'routers.update'(object) {

      // push a new version into history
      let preObject = Routers.findOne(object._id)
      delete preObject.history
      object.history.push({
        _id: Random.id(),
        date: preObject.updated_at || preObject.created_at,
        user: preObject.updated_by || preObject.created_by,
        object: preObject,
      })

      // save the current object
      object.updated_at = new Date()
      object.updated_by = `${ Meteor.user().profile.firstname } ${ Meteor.user().profile.lastname }`
      let { _id } = object
      delete object._id
      RouterSchema.validate(object)
      Routers.upsert( _id, { $set: object } )
    },

    'routers.remove'(id) {
      check(id, String)
      Routers.remove(id)
    },

  })
}
