import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Vehicles } from '/imports/collections'
import { getFullname, isAllowed } from '/imports/helpers'
import { dispatchNotification } from '../actions'
import { i18n } from '/imports/translations'

export default () => {
  Meteor.methods({
    'vehicles.insert'(object) {
      check(object, Object)

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('vehicles.insert', roles)) {
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      object.created_at = new Date()
      object.created_by = getFullname()
      object.archived = false
      let id = Vehicles.insert(object)

      // send notifications to subscribers
      let notification = {
        subject: `Fahrzeug ${ object.number } wurde hinzugefügt`,
        content: `${ object.created_by } hat das Fahrzeug ${ object.number } hinzugefügt.`,
        link: `/vehicle/${ id }/edit`,
        type: 'vehicle_inserted',
        created_at: new Date(),
        created_by: object.created_by
      }
      dispatchNotification(notification)

      return id
    },

    'vehicles.update'(object) {
      check(object, Object)

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('vehicles.update', roles)) {
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      object.updated_at = new Date()
      object.updated_by = getFullname()
      let { _id } = object
      delete object._id
      Vehicles.update( _id, { $set: object } )

      // send notifications to subscribers
      if (object.status === 'vehicle_upgrade'){
        let notification = {
          subject: `Fahrzeug ${ object.number } wird umgebaut`,
          content: `${ object.created_by } erteilte dem Fahrzeug ${ object.number } den Status Umbau.`,
          link: `/vehicle/${ _id }/edit`,
          type: 'vehicle_upgrade',
          created_at: new Date(),
          created_by: object.created_by
        }
        dispatchNotification(notification)
      }
    },

    'vehicles.remove'(id) {
      check(id, String)

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('vehicles.remove', roles)){
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      // define object as archived
      let object = Vehicles.findOne(id)
      object.updated_at = new Date()
      object.updated_by = getFullname()
      object.archived = true
      let { _id } = object
      delete object._id
      Vehicles.update( _id, { $set: object } )
    },

  })
}
