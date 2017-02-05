import { Meteor } from 'meteor/meteor'
import { Posts } from '/imports/collections'

let posts = () => {
  Meteor.publish('posts.list', (filter) => {
    if (filter === '') {
      return Posts.find({})
    } else {
      filterCase = filter.split(':')
      if (filterCase[1]) {
        let selector = {}
        selector[filterCase[0]] = { $regex: filterCase[1] }
        return Posts.find(selector)
      } else {
        return Posts.find({$or: [
          { _id: { $regex: filter } },
          { title: { $regex: filter } },
          { content: { $regex: filter } },
        ]})
      }
    }
  })

  Meteor.publish('posts.item', (id) => {
    return Posts.find({_id: id})
  })
}

export default posts
