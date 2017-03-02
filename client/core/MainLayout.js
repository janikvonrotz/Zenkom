import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AppBar, Drawer, MenuItem, IconMenu, IconButton,
  FlatButton } from 'material-ui'
import { Link } from 'react-router'
import { NavigationMoreVert } from 'material-ui/svg-icons'
import { connect } from 'react-redux'
import { Notification, FlexboxGrid } from './index'
import { logoutUser } from '../actions'
import Helmet from 'react-helmet'

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
    return (
      <MuiThemeProvider>
        <FlexboxGrid>
          <Helmet
            title={ `Zenkom - ${title}` }
            meta={ [ { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1' } ] }
          />
          <Notification />
          <AppBar
          title={ `Zenkom - ${title}` }
          iconElementRight={ user ? <IconMenu
            iconButtonElement={ <IconButton><NavigationMoreVert /></IconButton> }
            targetOrigin={ { horizontal: 'right', vertical: 'top' } }
            anchorOrigin={ { horizontal: 'right', vertical: 'top' } } >

              <MenuItem
              containerElement={ <Link to="/profile" /> }
              primaryText={ i18n.button.profile } />

              <MenuItem
              onTouchTap={ this.logout.bind(this) }
              primaryText={ i18n.button.logout } />

            </IconMenu> : <FlatButton
            containerElement={ <Link to="/login" /> }
            label={ i18n.button.login } />
          }
          onLeftIconButtonTouchTap={ this.toggleDrawer.bind(this) } />

          <Drawer
          open={ this.state.drawerOpen }
          docked={ false }
          onRequestChange={ (drawerOpen) => this.setState({ drawerOpen }) }
          width={ 200 }>

            <MenuItem
            primaryText={ i18n.button.dashboard }
            onTouchTap={ this.toggleDrawer.bind(this) }
            containerElement={ <Link to="/"/> } />

            <MenuItem
            primaryText="Post"
            onTouchTap={ this.toggleDrawer.bind(this) }
            containerElement={ <Link to="/posts" /> } />

            <MenuItem
            primaryText={ i18n.vocabulary.routers }
            onTouchTap={ this.toggleDrawer.bind(this) }
            containerElement={ <Link to="/routers" /> } />

          </Drawer>
          { this.props.children }
        </FlexboxGrid>
      </MuiThemeProvider>
    )
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
