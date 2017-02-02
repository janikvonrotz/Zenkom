export default notification = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_ERROR_MESSAGE':
      return {
        type: "error",
        message: action.error.message
      }
    case 'SHOW_SUCCESS_MESSAGE':
      return {
        type: "success",
        message: action.message
      }
    case 'DISMISS_MESSAGE':
      return {}
    default:
      return state
  }
}
