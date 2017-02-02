import { Meteor } from 'meteor/meteor';

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  }
}

export const loginUser = (email, password, dispatch) => {
  Meteor.loginWithPassword(email, password, (error, result) => {
    if (!error) {
      dispatch({
        type: 'SHOW_SUCCESS_MESSAGE',
        message: 'Successfully logged in.',
      })
      dispatch({
        type: 'SET_USER',
        user: Meteor.user(),
      })
    } else {
      dispatch({
        type: 'SHOW_ERROR_MESSAGE',
        error,
      })
    }
  })
}

export const logoutUser = (dispatch) => {
  Meteor.logout((error, result) => {
    if (!error) {
      dispatch({
        type: 'SHOW_SUCCESS_MESSAGE',
        message: 'Successfully logged out.',
      })
      dispatch({
        type: 'SET_USER',
        user: null
      })
    } else {
      dispatch({
        type: 'SHOW_ERROR_MESSAGE',
        error,
      })
    }
  })
}
