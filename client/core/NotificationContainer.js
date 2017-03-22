import Notification from './Notification'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Notifications } from '/imports/collections'
import { Meteor } from 'meteor/meteor'

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    user: state.user,
  }
}

export default connect(mapStateToProps)(createContainer(() => {
  let subscription = Meteor.subscribe('notifications.item_latest')
  return {
    // return notifications sent within the last 3 seconds
    desktopNotification: Notifications.findOne({ created_at: { $gt: (new Date((new Date())-1000*3)) } }),
    loading: !subscription.ready(),
  }
}, Notification))
