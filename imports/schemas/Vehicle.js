import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({
  number: {
    type: Number,
    label: 'Fahrzeugnummer',
  },
  type: {
    type: String,
    label: 'Typ',
  },
  status: {
    type: String,
    label: 'Status',
  },
  modification_until: {
    type: Date,
    label: 'Umbau bis',
    optional: true,
  },
  rollout_until: {
    type: Date,
    label: 'Inbetriebnahme bis',
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
