import { Mongo } from 'meteor/mongo'
import { NotificationSchema } from '../schemas'

let Notifications = new Mongo.Collection('notifications')
Notifications.attachSchema(NotificationSchema)

export default Notifications
