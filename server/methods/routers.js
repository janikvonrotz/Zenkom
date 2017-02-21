import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Routers } from '/imports/collections';

let routers = () => {
  Meteor.methods({
    'routers.insert'(object) {
      object.updated_at = new Date()
      object.created_at = new Date()
      return Routers.insert(object)
    },

    'routers.update'(object) {
      object.updated_at = new Date()
      let { _id } = object
      delete object._id
      Routers.update( _id, { $set: object } )
    },

    'routers.remove'(id) {
      check(id, String)
      Routers.remove(id)
    },

  })
}
export default routers
