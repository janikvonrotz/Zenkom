
import { Meteor } from 'meteor/meteor'
import { Notifications } from '/imports/collections'
import { Email } from 'meteor/email'
import { config, isAllowed } from '/imports/helpers'
import { i18n } from '/imports/translations'

export const dispatchNotification = (notification) => {
  let { type } = notification

  // get user ids with notification type enabled
  let users = Meteor.users.find({ 'settings.notifications': { $in: [ type ] } }).fetch().filter((user) => {

    // check permissions
    return isAllowed('notifications.receive', user.roles)
  })
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
        subject: `Zenkom - ${notification.subject}`,
        html: `
<p>${ i18n.de.vocabulary.greeting } ${ user.profile.name }</p>

<p>${ i18n.de.email.received_notification }</p>

<q>${ notification.content }</q>

<p>${ i18n.de.email.affected_object }</p>

<p><a href="${ process.env.ROOT_URL }${ notification.link }">${ process.env.ROOT_URL }${ notification.link }</a></p>

<p>${ i18n.de.email.manage_notifications }</p>

<p><a href="${ process.env.ROOT_URL }/settings">${ process.env.ROOT_URL }/settings</a></p>
`
      }
      Email.send(email)
    }
  })
}
