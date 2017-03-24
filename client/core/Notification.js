import notie from 'notie'
import 'notie/dist/notie.css'
import React from 'react'
import { dismissMessage } from '../actions'

const Alert = {
  error: (message) => {
    notie.alert(3, message, 2.5)
  },
  success: (message) => {
    notie.alert(1, message, 2.5)
  }
}

class NotificationComponent extends React.Component {

  componentWillReceiveProps(nextProps){
    let { desktopNotification, user } = this.props
    let { dispatch, notification } = nextProps

    // only send desktop notification if _id changed or it is receiving new props for the first time
    let send = false
    if (!desktopNotification && !!nextProps.desktopNotification) {
      send = true
    }
    if (desktopNotification && nextProps.desktopNotification && (desktopNotification._id != nextProps.desktopNotification._id)) {
      send = true
    }

    console.info('DESKTOP_NOTIFICATION', desktopNotification, send)

    // display desktop notification
    if (send && nextProps.desktopNotification && user && user.settings.channels.indexOf('browser_notification') != -1) {

      if (Notification.permission !== 'granted'){
        Notification.requestPermission()
      }

      let browserNotification = new Notification(nextProps.desktopNotification.subject, {
        icon: '/logo.png',
        body: nextProps.desktopNotification.content,
      })

      browserNotification.onclick = () => {
        window.open(nextProps.desktopNotification.link)
      }
    }

    // display alerts
    if (notification && notification.type) {
      Alert[notification.type](notification.message)
      setTimeout(() => {
        dispatch(dismissMessage())
      }, 1000)
    }
  }

  // return placeholder
  render() {
    return <div />
  }
}

export default NotificationComponent
