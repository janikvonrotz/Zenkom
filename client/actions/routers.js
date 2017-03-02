import { Meteor } from 'meteor/meteor'
import { browserHistory } from 'react-router'

export const insertRouter = (params) => {
  return (dispatch) => {
    if(params){
      Meteor.call('routers.insert', params, (error, result) => {
        if (!error) {
          dispatch({
            type: 'SHOW_SUCCESS_MESSAGE',
            message: 'Router has been added.',
          })
          browserHistory.push(`/router/${result}/edit`)
        } else {
          dispatch({
            type: 'SHOW_ERROR_MESSAGE',
            error,
          })
        }
      })
    } else {
      browserHistory.push('/router/new')
    }
  }
}

export const updateRouter = (params) => {
  return (dispatch) => {
    Meteor.call('routers.update', params, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: 'Router has been updated.',
        })
        browserHistory.push('/routers')
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}

export const removeRouter = (params) => {
  return (dispatch) => {
    Meteor.call('routers.remove', params, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: 'Router has been removed.',
        })
        browserHistory.push('/routers')
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}

export const setRouterFilter = (filter) => {
  return {
    type: 'SET_ROUTER_FILTER',
    filter
  }
}
