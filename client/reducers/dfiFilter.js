export default (state = '', action) => {
  switch (action.type) {
    case 'SET_DFI_FILTER':
      return action.filter
    default:
      return state
  }
}
