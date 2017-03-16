import { Meteor } from 'meteor/meteor'

export const insertFeedback = (params) => {
  return (dispatch, getState) => {
    Meteor.call('feedbacks.insert', params, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.feedback_sent,
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
