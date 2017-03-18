import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({
  username: {
    type: String,
    label: 'Benutzername',
    optional: true,
  },
  emails: {
    type: Array,
    label: 'Emails',
  },
  'emails.$': {
    type: Object
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  created_at: {
    type: Date,
    label: 'Erstelldatum',
  },
  // make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true,
    label: 'Dienste'
  },
  profile: {
    type: new SimpleSchema({
      firstname:{
        type: String,
        label: 'Vorname',
      },
      lastname:{
        type: String,
        label: 'Nachname',
      },
      name:{
        type: String,
        label: 'Name',
      }
    }),
    label: 'Profil',
  },
  roles: {
    type: Array,
    label: 'Rollen',
  },
  'roles.$': {
    type: String,
  },
  settings: {
    type: Object,
    label: 'Einstellungen',
  },
  'settings.notifications': {
    type: Array,
    label: 'Benachrichtigungen',
  },
  'settings.notifications.$': {
    type: String,
  },
  'settings.language': {
    type: String,
    label: 'Sprache',
  },
  'settings.channels': {
    type: Array,
    label: 'Benachrichtigungen',
  },
  'settings.channels.$': {
    type: String,
  },
  // in order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true,
    label: 'Herzschlag'
  }
})
