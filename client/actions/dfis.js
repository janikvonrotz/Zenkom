import { Meteor } from 'meteor/meteor'
import { browserHistory } from 'react-router'

export const insertDfi = (params) => {
  return (dispatch, getState) => {
    if (params) {
      Meteor.call('dfis.insert', params, (error) => {
        if (!error) {
          dispatch({
            type: 'SHOW_SUCCESS_MESSAGE',
            message: getState().i18n.message.dfi_added,
          })
          browserHistory.push('/dfis')
        } else {
          dispatch({
            type: 'SHOW_ERROR_MESSAGE',
            error,
          })
        }
      })
    } else {
      browserHistory.push('/dfi/new')
    }
  }
}

export const updateDfi = (params) => {
  return (dispatch, getState) => {
    Meteor.call('dfis.update', params, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.dfi_updated,
        })
        browserHistory.push('/dfis')
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}

export const removeDfi = (params) => {
  return (dispatch, getState) => {
    Meteor.call('dfis.remove', params, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.dfi_removed,
        })
        browserHistory.push('/dfis')
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}

export const setDfiFilter = (filter) => {
  return {
    type: 'SET_DFI_FILTER',
    filter
  }
}
