import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Notifications } from '/imports/collections'
import { getFullname, isAllowed } from '/imports/helpers'
import { i18n } from '/imports/translations'

export default () => {
  Meteor.methods({
    'notifications.insert'(object) {
      check(object, Object)

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('notifications.insert', roles)) {
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      object.created_at = new Date()
      object.created_by = getFullname()
      return Notifications.insert(object)
    },

    'notifications.remove'(id) {
      check(id, String)

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('notifications.remove', roles)) {
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      Notifications.remove(id)
    },

    'notifications.export'() {
      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('notifications.export', roles)) {
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      return Notifications.find({}).fetch().map((notification) => {
        notification.receivers = notification.receivers.join(', ')
        return notification
      })
    },
  })
}
