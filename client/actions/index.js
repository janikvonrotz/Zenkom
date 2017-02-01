// import posts from './posts'
//
// export { posts }

// create action to set a state
export const setHeaderTitle = (title) => {
  // return the action state and parameter
  return {
    type: 'SET_HEADER_TITLE',
    title
  }
}
