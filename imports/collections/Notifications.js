import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

let Notifications = new Mongo.Collection('notifications')
let schema = new SimpleSchema({
  subject: {
    type: String,
    label: 'Betreff',
  },
  content: {
    type: String,
    label: 'Inhalt',
  },
  type: {
    type: String,
    label: 'Typ',
  },
  receivers: {
    type: Array,
    label: 'Empfänger',
  },
  created_at: {
    type: Date,
    label: 'Erstelldatum',
  },
})
Notifications.attachSchema(schema)

export default Notifications
