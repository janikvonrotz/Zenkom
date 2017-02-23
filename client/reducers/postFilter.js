export default (state = '', action) => {
  switch (action.type) {
    case 'SET_POST_FILTER':
      return action.filter
    default:
      return state
  }
}
