import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

let users = () => {
  Meteor.methods({
    'users.send_email_verification'() {
      return Accounts.sendVerificationEmail(Meteor.userId())
    },
  })
}
export default users
