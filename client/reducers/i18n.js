
let phrases = {
  de: {
    button: {
      remove: 'Löschen',
      update: 'Speichern',
      commit: 'Neue Version',
      add_router: 'Router hinzufügen',
      search: 'Suche',
      cancel: 'Abrechen',
      login: 'Login',
      profile: 'Profil',
      logout: 'Logout',
      register: 'Registrieren',
      reset_password: 'Passwort zurücksetzen',
      recover_password: 'Password zurücksetzen',
      dashboard: 'Übersicht',
      verificate_email: 'Email verifizieren',
      resend_email_verification: 'Verifikations Email erneut senden'
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
      password: 'Passwort',
      username: 'Benutzername',
      email: 'Email',
      firstname: 'Vorname',
      lastname: 'Nachname',
      repeat_password: 'Passwort wiederholen',
    },
    question: {
      confirm_delete_router: 'Möchten Sie diesen Router wirklich löschen?',
      forgot_password: 'Passwort vergessen?',
      not_have_account: 'Sie haben noch keinen Account?',
      have_account: 'Sie haben bereits einen Account?'
    },
    hint: {
      login_with_ldap: 'Login mit LDAP?',
      login_without_ldap: 'Login ohne LDAP?',
      send_password_reset_link: 'Link für die Passwort Rücksetzung schicken.',
      set_new_password: 'Bestimmen Sie ihr neues Passwort.',
      check_verification_email: 'Überprüfen Sie ihren Email Account nach der Verifikations Email.',
      email_is_verified: 'Ihre Email wurde verifiziert.',
      email_is_not_verified: 'Ihre Email konnte nicht verifiziert werden.',
    },
    vocabulary: {
      router: 'Router',
      routers: 'Routers',
    },
    message: {
      router_added: 'Router wurde hinzugefügt.',
      router_updated: 'Router wurde gespeichert.',
      router_removed: 'Router wurde entfernt.',
      login_success: 'Erfolgreich eingeloggt.',
      profile_saved: 'Profil wurde gespeichert.',
      new_password_saved: 'Neues Passwort wurde gespeichert.',
      password_reset_link_sent: 'Passwort Rücksetzungslink wurde verschickt. Bitte überprüfen Sie ihren Email Account.',
      verification_email_sent: 'Das Verifikations Email wurde verschickt.',
      verifiy_email: 'Bitte verifizieren Sie ihre Email.',
      logout_success: 'Erfolgreich ausgeloggt.',
      passwords_not_match: 'Die Passwörter stimmen nicht überein.',
    },
    error: {
      password_invalid: 'Ungültiges Passwort',
    }
  },
  en: {
    button: {
      remove: 'Delete',
      update: 'Save',
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
