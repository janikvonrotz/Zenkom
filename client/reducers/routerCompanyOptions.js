let options = [
  'Verkehrsbetriebe Luzern',
  'Auto AG Uri',
  'Stadtbus Chur AG',
  'Engadin Bus',
  'Rottal Auto AG',
  'DFI vbl',
  'Anzeiger Bahnhof Luzern',
  'Andere',
]

export default (state = options, action) => {
  switch (action.type) {
    case 'SET_VEHICLE_COMPANY_OPTIONS':
      return action.filter
    default:
      return state
  }
}
