import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Routers } from '/imports/collections';

let routers = () => {
  Meteor.methods({
    'routers.insert'(object) {
      object.createdAt = new Date()
      return Routers.insert(object)
    },

    'routers.update'(object) {
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
