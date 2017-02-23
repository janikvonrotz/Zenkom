import { Meteor } from 'meteor/meteor'
import { browserHistory } from 'react-router'

export const insertPost = (params, dispatch) => {
  if(params){
    Meteor.call('posts.insert', params, (error, result) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: 'Post has been added.',
        })
        browserHistory.push(`/post/${result}/edit`)
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  } else {
    browserHistory.push('/post/new')
  }
}

export const updatePost = (params, dispatch) => {
  Meteor.call('posts.update', params, (error) => {
    if (!error) {
      dispatch({
        type: 'SHOW_SUCCESS_MESSAGE',
        message: 'Post has been updated.',
      })
      browserHistory.push('/posts')
    } else {
      dispatch({
        type: 'SHOW_ERROR_MESSAGE',
        error,
      })
    }
  })
}

export const removePost = (params, dispatch) => {
  Meteor.call('posts.remove', params, (error) => {
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

export const setPostFilter = (filter) => {
  return {
    type: 'SET_POST_FILTER',
    filter
  }
}
