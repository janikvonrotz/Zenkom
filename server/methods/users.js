import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

export default () => {

  Meteor.methods({
    'users.send_email_verification'() {
      return Accounts.sendVerificationEmail(Meteor.userId())
    },

    'users.update_profile'(profile) {
      profile.name = `${profile.firstname} ${profile.lastname}`
      Meteor.users.update( { _id: Meteor.userId() }, { $set: { profile: profile } } )
    },

    'users.update_settings'(settings) {
      Meteor.users.update( { _id: Meteor.userId() }, { $set: { settings: settings } } )
    },
  })
}
