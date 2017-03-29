
export default (state = null, action) => {
  switch (action.type) {
    case 'SET_ROUTER_STATISTIC':
      return action.statistic
    case 'RESET_ROUTER_STATISTIC':
      return null
    default:
      return state
  }
}
