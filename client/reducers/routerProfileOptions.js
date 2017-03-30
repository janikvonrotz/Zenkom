let options = [
  '4GB',
  '2GB',
  '250MB',
]

export default (state = options, action) => {
  switch (action.type) {
    case 'SET_ROUTER_PROFILE_OPTIONS':
      return action.options
    default:
      return state
  }
}
