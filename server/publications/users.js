import { Meteor } from 'meteor/meteor'

export default () => {

  Meteor.publish('users.current', function () {
    if (this.userId) {
      return Meteor.users.find({ _id: this.userId }, { fields: {
        profile: 1,
        emails: 1,
        roles: 1,
        settings: 1,
      } })
    } else {
      this.ready()
    }
  })

  Meteor.publish('users.list', function (filter, sort, limit) {
    let self = this

    // set selector and options
    let options = { fields: {
      profile: 1,
      emails: 1,
      roles: 1,
    } }
    if (sort) {
      options.sort = sort
    }
    if (limit && limit != 'all') {
      options.limit = limit
    }

    if (filter === '') {
      let handle = Meteor.users.find({}, options).observeChanges({
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
      ] }, options).observeChanges({
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
