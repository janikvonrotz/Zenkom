import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({
  description: {
    type: String,
    label: 'Bezeichnung',
  },
  type: {
    type: String,
    label: 'Typ',
    optional: true,
  },
  row_type: {
    type: String,
    label: 'Zeilentyp',
    optional: true,
  },
  location: {
    type: String,
    label: 'Standort',
    optional: true,
  },
  notes: {
    type: String,
    label: 'Status',
    optional: true,
  },
  created_at: {
    type: Date,
    label: 'Erstelldatum',
  },
  created_by: {
    type: String,
    label: 'Erstellt von',
  },
  updated_at: {
    type: Date,
    label: 'Änderungsdatum',
    optional: true,
  },
  updated_by: {
    type: String,
    label: 'Bearbeit von',
    optional: true,
  },
  archived: {
    type: Boolean,
    label: 'Archiviert',
  },
})
