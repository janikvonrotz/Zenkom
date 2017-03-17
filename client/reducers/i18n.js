import translations from '/imports/translations'

// bug #28
let { i18n } = translations
let phrases = {
  de: i18n.de,
  en: i18n.en,
}

export default (state = phrases.de, action) => {
  switch (action.type) {
    case 'SWITCH_LANGUAGE':
      return phrases[action.language]
    default:
      return state
  }
}
