
export default (state = 'Zenkom', action) => {
  switch (action.type) {
    case 'SET_HEADER_TITLE':
      return action.title
    default:
      return state
  }
}
