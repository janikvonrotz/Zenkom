import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Routers } from '/imports/collections'
import { RouterSchema } from '/imports/schemas'
import { Random } from 'meteor/random'
import { getFullname } from '/imports/helpers'

export default () => {
  Meteor.methods({
    'routers.insert'(object) {
      object.created_at = new Date()
      object.created_by = getFullname()
      object.history = []
      object.archived = false
      return Routers.insert(object)
    },

    'routers.update'(object) {

      // push a new version of last object
      let preObject = Routers.findOne(object._id)
      delete preObject.history
      object.history.push({
        _id: Random.id(),
        object: preObject,
      })

      // save the new object
      object.updated_at = new Date()
      object.updated_by = getFullname()
      let { _id } = object
      delete object._id
      Routers.upsert( _id, { $set: object } )
    },

    'routers.remove'(id) {
      check(id, String)
      Routers.remove(id)
    },

  })
}
