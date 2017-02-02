import { Meteor } from 'meteor/meteor';

export const updatePost = (params, dispatch) => {
  Meteor.call('posts.update', params, (error, result) => {
    if (!error) {
      dispatch({
        type: 'SHOW_SUCCESS_MESSAGE',
        message: 'Post has been updated.',
      })
    } else {
      dispatch({
        type: 'SHOW_ERROR_MESSAGE',
        error,
      })
    }
  })
}

export const removePost = (params, dispatch) => {
  Meteor.call('posts.remove', params, (error, result) => {
    if (!error) {
      dispatch({
        type: 'SHOW_SUCCESS_MESSAGE',
        message: 'Post has been removed.',
      })
    } else {
      dispatch({
        type: 'SHOW_ERROR_MESSAGE',
        error,
      })
    }
  })
}
