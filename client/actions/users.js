import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { browserHistory } from 'react-router'

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
      browserHistory.push('/')
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
      browserHistory.push('/login')
    } else {
      dispatch({
        type: 'SHOW_ERROR_MESSAGE',
        error,
      })
    }
  })
}

export const registerUser = (user, dispatch) => {
  Accounts.createUser(user, (error, result) => {
    if (!error) {
      dispatch({
        type: 'SHOW_SUCCESS_MESSAGE',
        message: 'Please verify your email.',
      })
      dispatch({
        type: 'SET_USER',
        user: Meteor.user(),
      })
      browserHistory.push('/email-verification')
    } else {
      dispatch({
        type: 'SHOW_ERROR_MESSAGE',
        error,
      })
    }
  })
}

export const verifyEmail = (token, dispatch) => {
  Accounts.verifyEmail(token, (error, result) => {
    if (error) {
      dispatch({
        type: 'SHOW_ERROR_MESSAGE',
        error,
      })
    }
  })
}

export const sendEmailVerification = (dispatch) => {
  Meteor.call('users.send_email_verification', (error, result) => {
    if (!error) {
      dispatch({
        type: 'SHOW_SUCCESS_MESSAGE',
        message: 'Verification email has been sent.',
      })
    } else {
      dispatch({
        type: 'SHOW_ERROR_MESSAGE',
        error,
      })
    }
  })
}

export const recoverPassword = (email, dispatch) => {
  Accounts.forgotPassword( { email: email }, (error, response) => {
    if (!error) {
      dispatch({
        type: 'SHOW_SUCCESS_MESSAGE',
        message: 'Password reset email has been sent. Please check your mail account.',
      })
    } else {
      dispatch({
        type: 'SHOW_ERROR_MESSAGE',
        error,
      })
    }
  })
}

export const resetPassword = (password, repeatPassword, token, dispatch) => {
  if (password != repeatPassword) {
    let error = new Meteor.Error(`Passwords don't mach.`, 'invalid password')
    dispatch({
      type: 'SHOW_ERROR_MESSAGE',
      error,
    })
  } else {
    Accounts.resetPassword(token, password, (error, response) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: 'New password has been saved.',
        })
        browserHistory.push('/')
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}
