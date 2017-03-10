import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({
  subject: {
    type: String,
    label: 'Betreff',
  },
  content: {
    type: String,
    label: 'Inhalt',
  },
  link: {
    type: String,
    label: 'Link',
    optional: true,
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
  created_by: {
    type: String,
    label: 'Erstellt von',
  },
})
