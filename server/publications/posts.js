import { Meteor } from 'meteor/meteor';
import { Posts } from '/imports/collections';

let posts = () => {
  Meteor.publish('posts.list', (filter) => {
    return Posts.find({});
  })

  Meteor.publish('posts.item', (id) => {
    return Posts.find({_id: id})
  })
}

export default posts
