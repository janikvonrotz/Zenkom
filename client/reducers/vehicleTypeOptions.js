let options = [
  'Trolley',
  'Gelenk',
]

export default (state = options, action) => {
  switch (action.type) {
    case 'SET_VEHICLE_TYPE_OPTIONS':
      return action.options
    default:
      return state
  }
}
