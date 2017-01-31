import { Meteor } from 'meteor/meteor';

let posts = {

  update(object) {
    Meteor.call('posts.update', object, (error, result) => {
      error ? console.log(error) : console.log('Updated!')
    })
  },

  remove(id) {
    Meteor.call('posts.remove', id, (error, result) => {
      error ? console.log(error) : console.log('Removed!')
    })
  },

}

export default posts
