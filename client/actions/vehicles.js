import { Meteor } from 'meteor/meteor'
import { browserHistory } from 'react-router'
import { downloadCSV } from '/imports/helpers'

export const insertVehicle = (params) => {
  return (dispatch, getState) => {
    if (params) {
      Meteor.call('vehicles.insert', params, (error) => {
        if (!error) {
          dispatch({
            type: 'SHOW_SUCCESS_MESSAGE',
            message: getState().i18n.message.vehicle_added,
          })
          browserHistory.push('/vehicles')
        } else {
          dispatch({
            type: 'SHOW_ERROR_MESSAGE',
            error,
          })
        }
      })
    } else {
      browserHistory.push('/vehicle/new')
    }
  }
}

export const updateVehicle = (params) => {
  return (dispatch, getState) => {
    Meteor.call('vehicles.update', params, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.vehicle_updated,
        })
        browserHistory.push('/vehicles')
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}

export const removeVehicle = (params) => {
  return (dispatch, getState) => {
    Meteor.call('vehicles.remove', params, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.vehicle_removed,
        })
        browserHistory.push('/vehicles')
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}

export const setVehicleFilter = (filter) => {
  return {
    type: 'SET_VEHICLE_FILTER',
    filter
  }
}

export const exportVehicles = () => {
  return (dispatch, getState) => {
    Meteor.call('vehicles.export', (error, result) => {
      if (!error) {
        if (result.length != -1) {
          downloadCSV(result, 'vehicles_export', getState())
          dispatch({
            type: 'SHOW_SUCCESS_MESSAGE',
            message: getState().i18n.message.vehicles_exported,
          })
        } else {
          dispatch({
            type: 'SHOW_ERROR_MESSAGE',
            message: getState().i18n.message.nothing_to_export,
          })
        }
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}
