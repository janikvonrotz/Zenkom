import React from 'react'
import { AppBar, Drawer, MenuItem, IconMenu, IconButton,
  FlatButton } from 'material-ui'
import { Link } from 'react-router'
import { NavigationMoreVert } from 'material-ui/svg-icons'
import { connect } from 'react-redux'
import { FlexboxGrid, FeedbackForm } from './index'
import { Notification } from '../notifications'
import { logoutUser } from '../actions'
import Helmet from 'react-helmet'
import { HardwareRouter, MapsDirectionsBus, ActionDashboard, ActionSettings,
  CommunicationMessage, SocialPeople, ActionInfo, ActionPermIdentity,
  ActionExitToApp, } from 'material-ui/svg-icons'
import { isAllowed } from '/imports/helpers'

class MainLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state = { drawerOpen: false }
  }

  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  logout(){
    let { dispatch } = this.props
    dispatch(logoutUser())
  }

  render() {
    let { title, user, i18n } = this.props
    return <FlexboxGrid>
      <Helmet
        title={ `Zenkom - ${title}` }
        meta={ [ { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1' } ] }
      />
      <Notification />
      <AppBar
      title={ title }
      iconElementRight={ user ? <IconMenu
        iconButtonElement={ <IconButton><NavigationMoreVert /></IconButton> }
        targetOrigin={ { horizontal: 'right', vertical: 'top' } }
        anchorOrigin={ { horizontal: 'right', vertical: 'top' } } >

          { isAllowed('users.update_profile', user ? user.roles : null) ?
          <MenuItem
          leftIcon={ <ActionPermIdentity /> }
          containerElement={ <Link to="/profile" /> }
          primaryText={ i18n.button.profile } />
          : null }

          { isAllowed('users.update_settings', user ? user.roles : null) ?
          <MenuItem
          leftIcon={ <ActionSettings /> }
          containerElement={ <Link to="/settings" /> }
          primaryText={ i18n.vocabulary.settings } />
          : null }

          <MenuItem
          leftIcon={ <ActionExitToApp /> }
          onTouchTap={ this.logout.bind(this) }
          primaryText={ i18n.button.logout } />

        </IconMenu> : <FlatButton
        containerElement={ <Link to="/login" /> }
        label={ i18n.button.login } />
      }
      iconElementLeft={ <img src={ '/logo.png' }/> }
      onLeftIconButtonTouchTap={ this.toggleDrawer.bind(this) } />

      <Drawer
      open={ this.state.drawerOpen }
      docked={ false }
      onRequestChange={ (drawerOpen) => this.setState({ drawerOpen }) }
      width={ 240 }>

        <MenuItem
        primaryText={ i18n.button.dashboard }
        onTouchTap={ this.toggleDrawer.bind(this) }
        leftIcon={ <ActionDashboard /> }
        containerElement={ <Link to="/"/> } />

        { isAllowed('routers.read', user ? user.roles : null) ?
        <MenuItem
        primaryText={ i18n.vocabulary.routers }
        onTouchTap={ this.toggleDrawer.bind(this) }
        leftIcon={ <HardwareRouter /> }
        containerElement={ <Link to="/routers" /> } />
        : null }

        { isAllowed('vehicles.read', user ? user.roles : null) ?
        <MenuItem
        primaryText={ i18n.vocabulary.vehicles }
        onTouchTap={ this.toggleDrawer.bind(this) }
        leftIcon={ <MapsDirectionsBus /> }
        containerElement={ <Link to="/vehicles" /> } />
        : null }

        { isAllowed('notifications.read', user ? user.roles : null) ?
        <MenuItem
        primaryText={ i18n.vocabulary.notifications }
        onTouchTap={ this.toggleDrawer.bind(this) }
        leftIcon={ <CommunicationMessage /> }
        containerElement={ <Link to="/notifications" /> } />
        : null }

        { isAllowed('users.read', user ? user.roles : null) ?
        <MenuItem
        primaryText={ i18n.vocabulary.users }
        onTouchTap={ this.toggleDrawer.bind(this) }
        leftIcon={ <SocialPeople /> }
        containerElement={ <Link to="/users" /> } />
        : null }

        <MenuItem
        primaryText={ i18n.button.about }
        onTouchTap={ this.toggleDrawer.bind(this) }
        leftIcon={ <ActionInfo /> }
        containerElement={ <Link to="/about" /> } />

      </Drawer>
      { this.props.children }

      { isAllowed('feedbacks.insert', user ? user.roles : null) ?
      <FeedbackForm />
      : null }

    </FlexboxGrid>
  }
}

const mapStateToProps = (state) => {
  return {
    title: state.headerTitle,
    user: state.user,
    i18n: state.i18n,
  }
}
export default connect(mapStateToProps)(MainLayout)
