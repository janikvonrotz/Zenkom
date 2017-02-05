import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Posts } from '/imports/collections';

let posts = () => {
  Meteor.methods({
    'posts.insert'(object) {
      // validate
      object.createdAt = new Date()
      return Posts.insert(object)
    },

    'posts.update'(object) {
      // validate
      let id = object._id
      delete object._id
      Posts.upsert( id, { $set: object } )
    },

    'posts.remove'(id) {
      check(id, String)
      Posts.remove(id)
    },

  })
}
export default posts
