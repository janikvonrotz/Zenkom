import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Routers } from '/imports/collections'
import { Random } from 'meteor/random'
import { getFullname, isAllowed } from '/imports/helpers'
import { dispatchNotification } from '../actions'
import { i18n } from '/imports/translations'
import { HTTP } from 'meteor/http'
import { config } from '/imports/helpers'

export default () => {
  Meteor.methods({
    'routers.insert'(object) {
      check(object, Object)

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('routers.insert', roles)) {
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      // insert object
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
      check(object, Object)

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('routers.update', roles)) {
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

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
      if (object.status != 'router_broken') {
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

      if (object.status === 'router_broken') {
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

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('routers.restore', roles)) {
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      // get version object and transfer history
      let object = Routers.findOne(id)
      let restoreObject = Object.assign({}, object.history.filter((version) => {
        return version._id === versionId
      })[0].object)
      let restoreObjectKeys = Object.keys(restoreObject)
      restoreObject.history = object.history

      // push version of current object and save restore
      delete object.history
      let objectKeys = Object.keys(object)
      restoreObject.history.push({
        _id: Random.id(),
        position: restoreObject.history.length,
        object: object,
      })

      // get keys to remove and update object
      let removeKeys = {}
      objectKeys.concat(restoreObjectKeys).map((key) => {
        if (restoreObjectKeys.indexOf(key) == -1) {
          removeKeys[key] = ''
        }
      })
      Routers.update(id, { $set: restoreObject, $unset: removeKeys } )

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

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('routers.remove', roles)) {
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      // define object as archived
      let object = Routers.findOne(id)
      object.updated_at = new Date()
      object.updated_by = getFullname()
      object.archived = true
      let { _id } = object
      delete object._id
      Routers.update( _id, { $set: object } )
    },

    'routers.get_statistic_url'(hostname) {

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('routers.read', roles)) {
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      return '/zabbix.jpg'

      console.log('config', config.zabbix)

      let result = HTTP.call('POST',
        'http://www.oev-live.ch/zabbix/api_jsonrpc.php',
        {
          data: {
            "jsonrpc": "2.0",
            "method": "user.login",
            "params": {
                "user": "zabbix",
                "password": "v60B05l"
            },
            "id": 1,
            "auth": null
          }
        }
      )

      let authToken = result.data.result
      console.log(authToken)

      result = HTTP.call('POST',
        'http://www.oev-live.ch/zabbix/api_jsonrpc.php',
        {
          data: {
            "jsonrpc": "2.0",
            "method": "host.get",
            "params": {
                "output": [
                    "hostid",
                    "host"
                ],
                "selectInterfaces": [
                    "interfaceid",
                    "ip"
                ],
                "filter": {
                    "host": [
                        hostname
                    ]
                }
            },
            "id": 2,
            "auth": authToken
          }
        }
      )

      if (result.data.result[0]) {
        let hostId = result.data.result[0].hostid
        console.log(hostId)
        return `http://192.168.15.180/chart.php?period=3600&itemids%5B0%5D=${hostId}`
      } else {
        return ''
      }

    }

  })
}
