import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Posts } from '/imports/collections';

let posts = () => {
  Meteor.methods({
    'posts.insert'(object) {
      object.createdAt = new Date()
      return Posts.insert(object)
    },

    'posts.update'(object) {
      let { _id } = object
      delete object._id
      Posts.update( _id, { $set: object } )
    },

    'posts.remove'(id) {
      check(id, String)
      Posts.remove(id)
    },

  })
}
export default posts
