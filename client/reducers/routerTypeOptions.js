let options = [
  'NB2500',
  'NB2541',
  'NB2700',
  'NB2700-2L',
  'NB2700-L-M',
  'NB2700-LU',
  'P3100',
  'SM-T315',
]

export default (state = options, action) => {
  switch (action.type) {
    case 'SET_ROUTER_TYPE_OPTIONS':
      return action.options
    default:
      return state
  }
}
