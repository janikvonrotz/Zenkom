
// create action to set a state
export const setHeaderTitle = (title) => {
  // return the action type and parameter
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
