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
      if (!isAllowed('users.update_profile', roles)) {
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      profile.name = `${profile.firstname} ${profile.lastname}`
      Meteor.users.update( { _id: Meteor.userId() }, { $set: { profile: profile } } )
    },

    'users.update_settings'(settings) {
      check(settings, Object)

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('users.update_settings', roles)) {
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      Meteor.users.update( { _id: Meteor.userId() }, { $set: { settings: settings } } )
    },

    'users.update_role'(id, role) {
      check(id, String)
      check(role, String)

      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('users.update_role', roles)) {
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      Meteor.users.update( { _id: id }, { $set: { roles: [ role ] } } )
    },

    'users.export'() {
      // check permissions
      let roles = Meteor.userId() ? Meteor.user().roles : null
      if (!isAllowed('users.export', roles)) {
        throw new Meteor.Error(i18n.de.error.insufficent_rights, i18n.de.message.insufficent_rights_for_method)
      }

      return Meteor.users.find({}).fetch().map((user) => {
        return {
          _id: user._id,
          email: user.emails[0].address,
          verified: user.emails[0].verified,
          created_at: user.created_at,
          firstname: user.profile.firstname,
          lastname: user.profile.lastname,
          name: user.profile.name,
          roles: user.roles.join(', '),
          notifications: user.settings.notifications.join(', '),
          channels: user.settings.channels.join(', '),
        }
      })
    },
  })
}
