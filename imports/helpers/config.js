import { Meteor } from 'meteor/meteor'

export default Object.assign(Meteor.settings.private, Meteor.settings.public)
