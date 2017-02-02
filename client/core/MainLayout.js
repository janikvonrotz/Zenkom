import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AppBar, Card, Drawer, MenuItem, IconMenu, IconButton,
  FlatButton } from 'material-ui'
import { Link } from 'react-router'
import { NavigationMoreVert } from 'material-ui/svg-icons'
import { connect } from 'react-redux'
import { Notification } from './index'
import { logoutUser } from '../actions'

class MainLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state = { drawerOpen: false }
  }

  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  logout(event){
    let { dispatch } = this.props
    logoutUser(dispatch)
  }

  render() {
    let { title, user } = this.props
    return (
      <MuiThemeProvider>
        <div>
          <Notification />
          <AppBar
          title={ title }
          iconElementRight={ user ? <IconMenu
            iconButtonElement={ <IconButton><NavigationMoreVert /></IconButton> }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}} >
                <MenuItem primaryText="Help" />
                <MenuItem
                onTouchTap={ this.logout.bind(this) }
                primaryText="Sign out" />
            </IconMenu> : <FlatButton
            containerElement={ <Link to="/login" /> }
            label="Login" />
          }
          onLeftIconButtonTouchTap={ this.toggleDrawer.bind(this) } />

          <Drawer
          open={ this.state.drawerOpen }
          docked={ false }
          onRequestChange={ (drawerOpen) => this.setState({ drawerOpen }) }
          width={ 200 }>

            <MenuItem
            primaryText="App"
            onTouchTap={ this.toggleDrawer.bind(this) }
            containerElement={ <Link to="/"/> }  />

            <MenuItem
            primaryText="Posts"
            onTouchTap={ this.toggleDrawer.bind(this) }
            containerElement={ <Link to="/posts" /> }  />

          </Drawer>
          { this.props.children }
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    title: state.headerTitle,
    user: state.user
  }
}

export default connect(mapStateToProps)(MainLayout)
