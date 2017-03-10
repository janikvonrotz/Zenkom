import { Meteor } from 'meteor/meteor'
import { getFullname } from '/imports/helpers'
import { Mongo } from 'meteor/mongo'

export default () => {

  let Feedbacks = new Mongo.Collection('feedbacks')

  Meteor.methods({
    'feedbacks.insert'(object) {
      object.created_at = new Date()
      object.created_by = getFullname()
      return Feedbacks.insert(object)
    },
  })
}
