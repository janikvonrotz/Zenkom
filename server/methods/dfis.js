import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Dfis } from '/imports/collections'
import { getFullname, isAllowed } from '/imports/helpers'
import { dispatchNotification } from '../actions'
import { i18n } from '/imports/translations'

export default () => {
  Meteor.methods({
    'dfis.insert'(object) {
      check(object, Object)

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('dfis.insert', roles)) {
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      object.created_at = new Date()
      object.created_by = getFullname()
      object.archived = false
      let id = Dfis.insert(object)

      // send notifications to subscribers
      let notification = {
        subject: `DFI ${ object.description } wurde hinzugefügt`,
        content: `${ object.created_by } hat den DFI ${ object.description } hinzugefügt.`,
        link: `/dfi/${ id }/edit`,
        type: 'dfi_inserted',
        created_at: new Date(),
        created_by: object.created_by
      }
      dispatchNotification(notification)

      return id
    },

    'dfis.update'(object) {
      check(object, Object)

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('dfis.update', roles)) {
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      object.updated_at = new Date()
      object.updated_by = getFullname()
      let { _id } = object
      delete object._id
      Dfis.update( _id, { $set: object } )
    },

    'dfis.remove'(id) {
      check(id, String)

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('dfis.remove', roles)){
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      // define object as archived
      let object = Dfis.findOne(id)
      object.updated_at = new Date()
      object.updated_by = getFullname()
      object.archived = true
      let { _id } = object
      delete object._id
      Dfis.update( _id, { $set: object } )
    },

  })
}
