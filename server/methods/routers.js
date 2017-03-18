import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Routers } from '/imports/collections'
import { Random } from 'meteor/random'
import { getFullname } from '/imports/helpers'
import { dispatchNotification } from '../actions'

export default () => {
  Meteor.methods({
    'routers.insert'(object) {
      object.created_at = new Date()
      object.created_by = getFullname()
      object.history = []
      object.archived = false
      let routerId = Routers.insert(object)

      // send notifications to subscribers
      let notification = {
        subject: `Router ${ object.hostname } wurde hinzugefügt`,
        content: `${ object.created_by } hat den Router ${ object.hostname } hinzugefügt.`,
        link: `/router/${ routerId }/edit`,
        type: 'router_inserted',
        created_at: new Date(),
        created_by: object.created_by
      }
      dispatchNotification(notification)

      return routerId
    },

    'routers.update'(object) {
      // push a new version of last object
      let preObject = Routers.findOne(object._id)
      delete preObject.history
      object.history.push({
        _id: Random.id(),
        position: object.history.length,
        object: preObject,
      })

      // save the current object
      object.updated_at = new Date()
      object.updated_by = getFullname()
      let { _id } = object
      delete object._id
      Routers.update( _id, { $set: object } )

      // send notifications to subscribers
      if(object.status != 'router_broken') {
        let notification = {
          subject: `Router ${ object.hostname } wurde aktualisiert`,
          content: `${ object.updated_by } hat den Router ${ object.hostname } aktualisiert.`,
          link: `/router/${ _id }/edit`,
          type: 'router_updated',
          created_at: new Date(),
          created_by: object.updated_by
        }
        dispatchNotification(notification)
      }

      if(object.status === 'router_broken') {
        let notification = {
          subject: `Router ${ object.hostname } ist defekt`,
          content: `${ object.updated_by } erteilte dem Router ${ object.hostname } den Status Defekt.`,
          link: `/router/${ _id }/edit`,
          type: 'router_broken',
          created_at: new Date(),
          created_by: object.updated_by
        }
        dispatchNotification(notification)
      }
    },

    'routers.restore'(id, versionId) {
      check(id, String)
      check(versionId, String)

      // get version object and transfer history
      let object = Routers.findOne(id)
      let restoreObject = Object.assign({}, object.history.filter((version) => {
        return version._id === versionId
      })[0].object)
      restoreObject.history = object.history

      // push version of current object and save restore
      delete object.history
      restoreObject.history.push({
        _id: Random.id(),
        position: restoreObject.history.length,
        object: object,
      })
      Routers.update(id, { $set: restoreObject } )

      // send notifications to subscribers
      let notification = {
        subject: `Router ${ object.hostname } wurde wiederhergestellt`,
        content: `${ object.updated_by } hat den Router ${ object.hostname } wiederhergestellt.`,
        link: `/router/${ id }/edit`,
        type: 'router_updated',
        created_at: new Date(),
        created_by: object.updated_by
      }
      dispatchNotification(notification)
    },

    'routers.remove'(id) {
      check(id, String)
      Routers.remove(id)
    },

    'routers.get_statistic_url'(id) {
      check(id, String)
      return 'https://raw.githubusercontent.com/monitoringartist/zabbix-docker-monitoring/master/doc/zabbix-docker-container-cpu-graph.png'
    }

  })
}
