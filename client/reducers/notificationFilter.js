export default (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION_FILTER':
      return action.filter
    default:
      return state
  }
}
