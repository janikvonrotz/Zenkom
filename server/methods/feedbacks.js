import { Meteor } from 'meteor/meteor'
import { getFullname, isAllowed } from '/imports/helpers'
import { Feedbacks } from '/imports/collections'
import { check } from 'meteor/check'
import { i18n } from '/imports/translations'

export default () => {

  Meteor.methods({
    'feedbacks.insert'(object) {
      check(object, Object)

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('feedbacks.insert', roles)){
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      object.created_at = new Date()
      object.created_by = getFullname()
      return Feedbacks.insert(object)
    },
  })
}
