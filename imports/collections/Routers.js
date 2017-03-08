import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

let Routers = new Mongo.Collection('routers')
let schema = new SimpleSchema({
  vehicle_id: {
    type: Number,
    label: 'Fahrzeugnummer',
    optional: true,
  },
  dfi_name: {
    type: String,
    label: 'DFI Bezeichnung',
    optional: true
  },
  router_version: {
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
    type: Number,
    label: 'SIM 1',
    optional: true,
  },
  sim2: {
    type: Number,
    label: 'SIM 2',
    optional: true,
  },
  sim_itt: {
    type: Number,
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
  updated_at: {
    type: Date,
    label: 'Änderungsdatum',
  },
  archived: {
    type: Boolean,
    label: 'Archiviert',
  },
  history: {
    type: Array,
    label: 'Versionsverlauf',
    optional: true,
  },
  'history.$.date': {
    type: Date,
    label: 'Versionsdatum',
  },
  'history.$.user_id': {
    type: String,
    label: 'Author',
  },
  'history.$.router': {
    type: Object,
    label: 'Router',
    blackbox: true
  },
})
Routers.attachSchema(schema)

export default Routers
