let options = [
  'user',
  'admin',
  'tech',
  'spec'
]

export default (state = options, action) => {
  switch (action.type) {
    case 'SET_USER_ROLE_OPTIONS':
      return action.options
    default:
      return state
  }
}
