let options = [
  '4',
  '8',
]

export default (state = options, action) => {
  switch (action.type) {
    case 'SET_DFI_ROW_TYPE_OPTIONS':
      return action.options
    default:
      return state
  }
}
