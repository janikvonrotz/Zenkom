let options = [
  'vehicle_rollout',
  'vehicle_active',
  'vehicle_upgrade',
  'vehicle_out_of_order'
]

export default (state = options, action) => {
  switch (action.type) {
    case 'SET_VEHICLE_STATUS_OPTIONS':
      return action.filter
    default:
      return state
  }
}
