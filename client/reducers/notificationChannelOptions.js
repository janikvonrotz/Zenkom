let options = [
  'browser_notification',
  'email_notification'
]

export default (state = options, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION_CHANNEL_OPTIONS':
      return action.options
    default:
      return state
  }
}
