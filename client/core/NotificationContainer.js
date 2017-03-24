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
    desktopNotification: Notifications.find({}, { sort: { created_at: -1 }, limit: 1 }).fetch()[0],
    loading: !subscription.ready(),
  }
}, Notification))
