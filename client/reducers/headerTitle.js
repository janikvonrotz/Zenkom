
// set default value for state
const headerTitle = (state = 'Zenkom', action) => {
  // depending on action type set the state
  switch (action.type) {
    case 'SET_HEADER_TITLE':
      return action.title
    default:
      return state
  }
}

export default headerTitle
