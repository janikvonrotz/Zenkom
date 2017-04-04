let options = [
  'Standard',
  'Nicht Standard'
]

export default (state = options, action) => {
  switch (action.type) {
    case 'SET_DFI_TYPE_OPTIONS':
      return action.options
    default:
      return state
  }
}
