import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Vehicles } from '/imports/collections'
import { getFullname } from '/imports/helpers'
import { dispatchNotification } from '../actions'

export default () => {
  Meteor.methods({
    'vehicles.insert'(object) {
      object.created_at = new Date()
      object.created_by = getFullname()
      let vehicleId = Vehicles.insert(object)

      // send notifications to subscribers
      let notification = {
        subject: `Fahrzeug ${ object.number } wurde hinzugefügt`,
        content: `${ object.created_by } hat das Fahrzeug ${ object.number } hinzugefügt.`,
        link: `/vehicle/${ vehicleId }/edit`,
        type: 'vehicle_inserted',
        created_at: new Date(),
        created_by: object.created_by
      }
      dispatchNotification(notification)

      return vehicleId
    },

    'vehicles.update'(object) {
      object.updated_at = new Date()
      object.updated_by = getFullname()
      let { _id } = object
      delete object._id
      Vehicles.update( _id, { $set: object } )

      // send notifications to subscribers
      if(object.status === 'vehicle_upgrade') {
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
      Vehicles.remove(id)
    },

  })
}
