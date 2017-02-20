import { Meteor } from 'meteor/meteor'
import { Routers } from '/imports/collections'

let routers = () => {
  Meteor.publish('routers.list', (filter) => {
    if (filter === '') {
      return Routers.find({})
    } else {
      filterCase = filter.split(':')
      if (filterCase[1]) {
        let selector = {}
        selector[filterCase[0]] = { $regex: filterCase[1] }
        return Routers.find(selector)
      } else {
        return Routers.find({$or: [
          { _id: { $regex: filter } },
          { title: { $regex: filter } },
          { content: { $regex: filter } },
        ]})
      }
    }
  })

  Meteor.publish('routers.item', (id) => {
    return Routers.find({_id: id})
  })
}

export default routers
