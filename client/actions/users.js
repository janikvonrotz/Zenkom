import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { browserHistory } from 'react-router'

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  }
}

export const loginUser = (email, password) => {
  return (dispatch, getState) => {
    Meteor.loginWithPassword(email, password, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.login_success,
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
}

export const loginUserWithLDAP = (email, password) => {
  return (dispatch, getState) => {
    let loginRequest = {
      ldap: true,
      email: email,
      pass: password,
    }
    Accounts.callLoginMethod({
      methodArguments: [ loginRequest ],
      userCallback: (error) => {
        if (!error) {
          dispatch({
            type: 'SHOW_SUCCESS_MESSAGE',
            message: getState().i18n.message.login_success,
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
      }
    })
  }
}

export const logoutUser = () => {
  return (dispatch, getState) => {
    Meteor.logout((error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.logout_success,
        })
        dispatch({
          type: 'SET_USER',
          user: null
        })
        browserHistory.push('/login?ldap=true')
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}

export const registerUser = (user) => {
  return (dispatch, getState) => {
    Accounts.createUser(user, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.verifiy_email,
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
}

export const verifyEmail = (token) => {
  return (dispatch) => {
    Accounts.verifyEmail(token, (error) => {
      if (error) {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}

export const sendEmailVerification = () => {
  return (dispatch, getState) => {
    Meteor.call('users.send_email_verification', (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.verification_email_sent,
        })
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}

export const recoverPassword = (email) => {
  return (dispatch, getState) => {
    Accounts.forgotPassword( { email: email }, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.password_reset_link_sent,
        })
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}

export const resetPassword = (password, repeatPassword, token) => {
  return (dispatch, getState) => {
    if (password != repeatPassword) {
      let error = new Meteor.Error(getState().i18n.error.password_invalid,
        getState().i18n.message.passwords_not_match)
      dispatch({
        type: 'SHOW_ERROR_MESSAGE',
        error,
      })
    } else {
      Accounts.resetPassword(token, password, (error) => {
        if (!error) {
          dispatch({
            type: 'SHOW_SUCCESS_MESSAGE',
            message: getState().i18n.message.new_password_saved,
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
}

export const updateUserProfile = (profile) => {
  return (dispatch, getState) => {
    Meteor.call('users.update_profile', profile, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.profile_saved,
        })
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}

export const updateUserSettings = (params) => {
  return (dispatch, getState) => {
    Meteor.call('users.update_settings', params, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.settings_saved,
        })
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}

export const setUserFilter = (filter) => {
  return {
    type: 'SET_USER_FILTER',
    filter
  }
}

export const updateUserRole = (id, role) => {
  return (dispatch, getState) => {
    Meteor.call('users.update_role', id, role, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.role_saved,
        })
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}
