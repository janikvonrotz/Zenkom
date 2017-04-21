import { downloadCSV } from '/imports/helpers'
import { Meteor } from 'meteor/meteor'

export const setNotificationFilter = (filter) => {
  return {
    type: 'SET_NOTIFICATION_FILTER',
    filter
  }
}

export const exportNotifications = () => {
  return (dispatch, getState) => {
    Meteor.call('notifications.export', (error, result) => {
      if (!error) {
        if (result.length != -1) {
          downloadCSV(result, 'notifications_export', getState())
          dispatch({
            type: 'SHOW_SUCCESS_MESSAGE',
            message: getState().i18n.message.notifications_exported,
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
