import { Meteor } from 'meteor/meteor'
import { getFullname } from '/imports/helpers'
import { Feedbacks } from '/imports/collections'

export default () => {

  Meteor.methods({
    'feedbacks.insert'(object) {
      object.created_at = new Date()
      object.created_by = getFullname()
      return Feedbacks.insert(object)
    },
  })
}
