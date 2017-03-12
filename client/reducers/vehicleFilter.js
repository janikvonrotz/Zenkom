export default (state = '', action) => {
  switch (action.type) {
    case 'SET_VEHICLE_FILTER':
      return action.filter
    default:
      return state
  }
}
