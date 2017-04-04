
export default (state = 10, action) => {
  switch (action.type) {
    case 'SET_LIST_LIMIT':
      return action.limit
    case 'INCREASE_LIST_LIMIT':
      return action.limit != 'all' ? (action.limit + 10) : action.limit
    case 'RESET_LIST_LIMIT':
      return 10
    default:
      return state
  }
}
