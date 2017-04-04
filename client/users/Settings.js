import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Subheader, Divider, Checkbox, Card,
  CardText, RaisedButton, CircularProgress } from 'material-ui'
import { setHeaderTitle, updateUserSettings } from '../actions'
import { isAllowed } from '/imports/helpers'

class Profile extends React.Component {

  update() {
    let { dispatch, notificationOptions, channelOptions, user } = this.props
    let { router_updated, router_inserted, router_broken, vehicle_inserted,
      vehicle_upgrade, browser_notification, email_notification,
      dfi_inserted } = this.refs

    let notifications = []
    notificationOptions = { router_updated, router_inserted, router_broken,
      vehicle_inserted,  vehicle_upgrade, dfi_inserted }
    Object.keys(notificationOptions).map((key) => {
      if (notificationOptions[key].isChecked()) {
        notifications.push(key)
      }
    })

    let channels = []
    channelOptions = { browser_notification, email_notification }
    Object.keys(channelOptions).map((key) => {
      if (channelOptions[key].isChecked()) {
        channels.push(key)
      }
    })

    let settings = {
      notifications: notifications,
      channels: channels,
      language: user.settings.language
    }

    dispatch(updateUserSettings(settings))
  }

  check(option) {
    let { browser_notification } = this.refs
    browser_notification = browser_notification.isChecked()

    // request desktop notification permission
    if (option === 'browser_notification' && browser_notification) {
      if (Notification.permission != 'granted') {
        Notification.requestPermission()
      }
    }
  }

  componentDidMount(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.vocabulary.settings))
  }
  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.vocabulary.settings))
  }

  render() {
    let { user, i18n, notificationOptions, channelOptions } = this.props

    return !user ? <CircularProgress /> : <Card>
      <CardText>
       <List>
         <Subheader>{ i18n.vocabulary.notification_channels }</Subheader>
         { channelOptions.map((option) => {
           return <ListItem
             key={ option }
             value={ option }
             leftCheckbox={ <Checkbox
               defaultChecked={ user.settings.channels.indexOf(option) != -1 }
               onCheck={ this.check.bind(this, option) }
               ref={ option } /> }
             primaryText={ i18n.option[option] } />
         })}
       </List>
       <Divider />
       <List>
         <Subheader>{ i18n.vocabulary.notifications }</Subheader>
         { notificationOptions.map((option) => {
           return <ListItem
             key={ option }
             value={ option }
             leftCheckbox={ <Checkbox
               defaultChecked={ user.settings.notifications.indexOf(option) != -1 }
               ref={ option } /> }
             primaryText={ i18n.option[option] } />
         })}
       </List>

       { isAllowed('users.update_settings', user ? user.roles : null) ?
       <RaisedButton
       label={ i18n.button.update }
       primary={ true }
       onTouchTap={ this.update.bind(this) } />
       : null }
      </CardText>
    </Card>
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    i18n: state.i18n,
    notificationOptions: state.serverNotificationOptions,
    channelOptions: state.notificationChannelOptions,
  }
}
export default connect(mapStateToProps)(Profile)
