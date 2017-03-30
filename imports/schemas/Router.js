import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({
  hostname: {
    type: String,
    label: 'Hostname',
  },
  vehicle_id: {
    type: String,
    label: 'Fahrzeug',
    optional: true,
  },
  dfi_name: {
    type: String,
    label: 'DFI Bezeichnung',
    optional: true
  },
  dfi_id: {
    type: String,
    label: 'DFI',
    optional: true
  },
  version: {
    type: String,
    label: 'Version',
    optional: true,
  },
  type: {
    type: String,
    label: 'Typ',
  },
  serial_number: {
    type: String,
    label: 'Seriennummer',
  },
  spos_id: {
    type: String,
    label: 'SPOS Nummer',
    optional: true,
  },
  status: {
    type: String,
    label: 'Status',
  },
  ip_router: {
    type: String,
    label: 'IP Router',
    optional: true,
  },
  ip_cashbox: {
    type: String,
    label: 'IP Kasse',
    optional: true,
  },
  sim1: {
    type: String,
    label: 'SIM 1',
    optional: true,
  },
  sim2: {
    type: String,
    label: 'SIM 2',
    optional: true,
  },
  sim_itt: {
    type: String,
    label: 'SIM ITT',
  },
  phone1: {
    type: String,
    label: 'SIM Telefonnumer 1',
    optional: true,
  },
  phone2: {
    type: String,
    label: 'SIM Telefonnumer 2',
    optional: true,
  },
  phone_itt: {
    type: String,
    label: 'SIM Telefonnumer ITT',
    optional: true,
  },
  profile: {
    type: String,
    label: 'Profil',
    optional: true,
  },
  notes: {
    type: String,
    label: 'Notizen',
    optional: true,
  },
  transport_company: {
    type: String,
    label: 'Transportunternehmen',
  },
  installed_at: {
    type: Date,
    label: 'Einbaudatum',
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
  history: {
    type: Array,
    label: 'Versionsverlauf',
  },
  'history.$': Object,
  'history.$._id': {
    type: String,
    label: 'Version ID',
  },
  'history.$.position': {
    type: String,
    label: 'Position',
  },
  'history.$.object': {
    type: Object,
    label: 'Router',
    blackbox: true,
  },
})
