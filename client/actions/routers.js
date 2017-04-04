import { Meteor } from 'meteor/meteor'
import { browserHistory } from 'react-router'

export const insertRouter = (params) => {
  return (dispatch, getState) => {
    if (params){
      Meteor.call('routers.insert', params, (error) => {
        if (!error) {
          dispatch({
            type: 'SHOW_SUCCESS_MESSAGE',
            message: getState().i18n.message.router_added,
          })
          browserHistory.push('/routers')
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
  return (dispatch, getState) => {
    Meteor.call('routers.update', params, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.router_updated,
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
  return (dispatch, getState) => {
    Meteor.call('routers.remove', params, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.router_removed,
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

export const restoreRouter = (id, versionId) => {
  return (dispatch, getState) => {
    Meteor.call('routers.restore', id, versionId, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.router_restored,
        })
        browserHistory.push(`/router/${ id }/edit`)
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

export const setRouterStatisticUrl = (id, hostname) => {
  return (dispatch, getState) => {
    let { routerStatistic } = getState()

    // only get new statistic if state is not set yet or id has changed
    if ((routerStatistic === null && id && hostname) ||
      (routerStatistic && routerStatistic.id != id)) {

      Meteor.call('routers.get_statistic_url', hostname, (error, response) => {
        if (!error) {
          let statistic = {
            id: id,
            url: response
          }
          dispatch({
            type: 'SET_ROUTER_STATISTIC',
            statistic
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
}
