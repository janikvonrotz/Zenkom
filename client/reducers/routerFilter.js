export default (state = '', action) => {
  switch (action.type) {
    case 'SET_ROUTER_FILTER':
      return action.filter
    default:
      return state
  }
}
