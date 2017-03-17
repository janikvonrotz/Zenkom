
import { Meteor } from 'meteor/meteor'
import { Notifications } from '/imports/collections'
import { Email } from 'meteor/email'
import { config } from '/imports/helpers'
import translations from '/imports/translations'

export const dispatchNotification = (notification) => {
  let { type } = notification

  // bug #28
  let { i18n } = translations
  i18n = i18n.de

  // get user ids with notification type enabled
  let users = Meteor.users.find({ 'settings.notifications': { $in: [ type ] } }).fetch()
  let receivers = users.map((user) => {
    return user._id
  })

  // add notification to collection
  notification.receivers = receivers
  Notifications.insert(notification)

  // send notification emails
  users.map((user) => {
    if(user.settings.channels.indexOf('email_notification') != -1) {
      let email = {
        to: user.emails[0].address,
        from: config.mail.notificationFrom,
        subject: notification.subject,
        text: `
${ i18n.vocabulary.greeting } ${ user.profile.name }

${ i18n.email.received_notification }

"${ notification.content }"

${ i18n.email.affected_object }

${ process.env.ROOT_URL }${ notification.link }

${ i18n.email.manage_notifications }

${ process.env.ROOT_URL }/settings
`
      }
      Email.send(email)
    }
  })
}
