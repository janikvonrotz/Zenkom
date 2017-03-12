import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Routers } from '/imports/collections'
import { Random } from 'meteor/random'
import { getFullname } from '/imports/helpers'

export default () => {
  Meteor.methods({
    'routers.insert'(object) {
      object.created_at = new Date()
      object.created_by = getFullname()
      object.history = []
      object.archived = false
      return Routers.insert(object)
    },

    'routers.update'(object) {

      // push a new version of last object
      let preObject = Routers.findOne(object._id)
      delete preObject.history
      object.history.push({
        _id: Random.id(),
        object: preObject,
      })

      // save the current object
      object.updated_at = new Date()
      object.updated_by = getFullname()
      let { _id } = object
      delete object._id
      Routers.update( _id, { $set: object } )
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
        object: object,
      })
      Routers.update(id, { $set: restoreObject } )
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
