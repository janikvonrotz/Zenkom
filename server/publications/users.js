import { Meteor } from 'meteor/meteor'

export default () => {
  Meteor.publish('users.list', (filter) => {
    let fields = {
      profile: 1,
      emails: 1,
      roles: 1,
    }
    if (filter === '') {
      return Meteor.users.find({}, { fields: fields })
    } else {
      return Meteor.users.find({ $or: [
        { _id: { $regex: filter } },
        { 'profile.name': { $regex: filter } },
        { 'emails.0.address': { $regex: filter } },
        { 'roles.0': { $regex: filter } },
      ] }, { fields: fields })
    }
  })
}
