
export const setHeaderTitle = (title) => {
  return {
    type: 'SET_HEADER_TITLE',
    title
  }
}

export const dismissMessage = () => {
  return {
    type: 'DISMISS_MESSAGE'
  }
}

export const switchLanguage = (language) => {
  return {
    type: 'SWITCH_LANGUAGE',
    language
  }
}

export const setListLimit = (limit) => {
  return {
    type: 'SET_LIST_LIMIT',
    limit
  }
}
