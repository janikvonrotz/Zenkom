
import { Meteor } from 'meteor/meteor'
import { Notifications } from '/imports/collections'

export const dispatchNotification = (notification) => {
  console.info('NOTIFCATION', notification)
}
