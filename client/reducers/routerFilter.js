export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_ROUTER_FILTER':
      return action.filter
    case 'RESET_ROUTER_FILTER':
      return {}
    default:
      return state
  }
}
