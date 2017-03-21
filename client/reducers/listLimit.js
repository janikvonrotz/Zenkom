
export default (state = 10, action) => {
  switch (action.type) {
    case 'SET_LIST_LIMIT':
      return action.limit
    default:
      return state
  }
}
