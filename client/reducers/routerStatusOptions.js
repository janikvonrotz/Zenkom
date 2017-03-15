let options = [ 'router_rollout', 'router_active', 'router_sent',
  'router_out_of_order', 'router_broken' ]

export default (state = options, action) => {
  switch (action.type) {
    case 'SET_VEHICLE_STATUS_OPTIONS':
      return action.filter
    default:
      return state
  }
}
