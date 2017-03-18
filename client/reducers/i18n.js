import { i18n } from '/imports/translations'

export default (state = i18n.de, action) => {
  switch (action.type) {
    case 'SWITCH_LANGUAGE':
      return i18n[action.language]
    default:
      return state
  }
}
