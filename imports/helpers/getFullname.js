import { Meteor } from 'meteor/meteor'

export default () => {
  return `${ Meteor.user().profile.firstname } ${ Meteor.user().profile.lastname }`
}
