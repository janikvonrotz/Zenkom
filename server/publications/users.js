import { Meteor } from 'meteor/meteor'

export default () => {

  Meteor.publish('userData', function () {
    if (this.userId) {
      return Meteor.users.find({ _id: this.userId })
    } else {
      this.ready()
    }
  })

  Meteor.publish('users.list', function (filter) {
    self = this
    let fields = {
      profile: 1,
      emails: 1,
      roles: 1,
    }
    if (filter === '') {
      let handle = Meteor.users.find({}, { fields: fields }).observeChanges({
        added: (id, object) => {
          self.added('_users', id, object)
        },
        changed: (id, object) => {
          self.changed('_users', id, object)
        },
        removed: (id) => {
          self.removed('_users', id)
        }
      })
      self.ready()
      self.onStop(() => {
        handle.stop()
      })
    } else {
      let handle = Meteor.users.find({ $or: [
        { _id: { $regex: filter } },
        { 'profile.name': { $regex: filter } },
        { 'emails.0.address': { $regex: filter } },
        { 'roles.0': { $regex: filter } },
      ] }, { fields: fields }).observeChanges({
        added: (id, object) => {
          self.added('_users', id, object)
        },
        changed: (id, object) => {
          self.changed('_users', id, object)
        },
        removed: (id) => {
          self.removed('_users', id)
        }
      })
      self.ready()
      self.onStop(() => {
        handle.stop()
      })
    }
  })
}
