
export default (state = 10, action) => {
  switch (action.type) {
    case 'SET_ROUTER_LIST_LIMIT':
      return action.limit
    case 'INCREASE_ROUTER_LIST_LIMIT':
      return action.limit != 'all' ? (action.limit + 10) : action.limit
    case 'RESET_ROUTER_LIST_LIMIT':
      return 10
    default:
      return state
  }
}
