import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { i18n } from '/imports/translations'
import { isAllowed } from '/imports/helpers'
import { check } from 'meteor/check'

export default () => {

  Meteor.methods({
    'users.send_email_verification'() {
      return Accounts.sendVerificationEmail(Meteor.userId())
    },

    'users.update_profile'(profile) {
      check(profile, Object)

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if(!isAllowed('users.update_profile', roles)){
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      profile.name = `${profile.firstname} ${profile.lastname}`
      Meteor.users.update( { _id: Meteor.userId() }, { $set: { profile: profile } } )
    },

    'users.update_settings'(settings) {
      check(settings, Object)

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if(!isAllowed('users.update_settings', roles)){
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      Meteor.users.update( { _id: Meteor.userId() }, { $set: { settings: settings } } )
    },

    'users.update_role'(id, role) {
      check(id, String)
      check(role, String)

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if(!isAllowed('users.update_role', roles)){
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      Meteor.users.update( { _id: id }, { $set: { roles: [ role ] } } )
    },
  })
}
