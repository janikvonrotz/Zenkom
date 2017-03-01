
let phrases = {
  de: {
    button: {
      delete: 'Löschen',
      save: 'Speichern',
      commit: 'Neue Version',
      add_router: 'Router hinzufügen',
      search: 'Suche'
    },
    label: {
      id: 'ID',
      vehicle_id: 'Fahrzeugnummer',
      dfi_name: 'DFI Bezeichnung',
      router_version: 'Version',
      type: 'Typ',
      serial_number: 'Seriennummer',
      spos_id: 'SPOS Nummer',
      status: 'Status',
      ip_router: 'IP Router',
      ip_cashbox: 'IP Kasse',
      sim1: 'SIM 1',
      sim2: 'SIM 2',
      sim_itt: 'SIM ITT',
      phone1: 'SIM Telefonnumer 1',
      phone2: 'SIM Telefonnumer 2',
      phone_itt: 'SIM Telefonnummer ITT',
      profile: 'Profil',
      notes: 'Notizen',
      transport_company: 'Transportunternehmen',
      installed_at: 'Einbaudatum',
      created_at: 'Erstelldatum',
      updated_at: 'Änderungsdatum',
      history: 'Verlauf',
    }
  },
  en: {
    button: {
      delete: 'Delete',
      save: 'Save',
      commit: 'Commit',
      add_router: 'Add Router'
    }
  }
}

export default (state = phrases.de, action) => {
  switch (action.type) {
    case 'SWITCH_LANGUAGE':
      return phrases[action.language]
    default:
      return state
  }
}
