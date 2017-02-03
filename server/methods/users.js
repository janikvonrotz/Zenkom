import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

let users = () => {
  Meteor.methods({
    'users.send_email_verification'() {
      return Accounts.sendVerificationEmail(Meteor.userId())
    },

    'users.update_profile'(profile) {
      Meteor.users.update( { _id: Meteor.userId() }, { $set: { profile: profile }} )
    },
  })
}
export default users
