import notie from 'notie'
import 'notie/dist/notie.css'
import React from 'react'
import { connect } from 'react-redux'
import { dismissMessage } from '../actions'

const Alert = {
  error: (message) => {
    notie.alert(3, message, 2.5)
  },
  success: (message) => {
    notie.alert(1, message, 2.5)
  }
}

const Notification = ({ dispatch, notification }) => {

  if (notification.type) {
    Alert[notification.type](notification.message)
    setTimeout(() => {
      dispatch(dismissMessage())
    }, 1000)
  }

  return (
    <div />
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    title: state.headerTitle
  }
}

export default connect(mapStateToProps)(Notification)
