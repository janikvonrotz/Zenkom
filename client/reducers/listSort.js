
export default (state = null, action) => {
  switch (action.type) {
    case 'SET_LIST_SORT':
      return action.sort
    default:
      return state
  }
}
