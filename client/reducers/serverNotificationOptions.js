let options = [ 'router_updated', 'router_inserted', 'router_broken',
'vehicle_inserted', 'vehicle_upgrade' ]

export default (state = options, action) => {
  switch (action.type) {
    case 'SET_SERVER_NOTIFICATION_OPTIONS':
      return action.options
    default:
      return state
  }
}
