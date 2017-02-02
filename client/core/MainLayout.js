import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AppBar, Card, Drawer, MenuItem, IconMenu, IconButton} from 'material-ui'
import { Link } from 'react-router'
import { MoreVertIcon } from 'material-ui/svg-icons'
import { connect } from 'react-redux'
import { Notification } from './index'

class MainLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = { drawerOpen: false };
  }

  toggleDrawer() {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  render() {
    let { title } = this.props

    return (
      <MuiThemeProvider>
        <div>
          <Notification />
          <AppBar
          title={ title }
          onTouchTap={this.toggleDrawer.bind(this)} />

          <Drawer
          open={this.state.drawerOpen}
          docked={false}
          onRequestChange={(drawerOpen) => this.setState({drawerOpen})}
          width={200}>

            <MenuItem
            primaryText="App"
            onTouchTap={this.toggleDrawer.bind(this)}
            containerElement={<Link to="/"/>}  />

            <MenuItem
            primaryText="Posts"
            onTouchTap={this.toggleDrawer.bind(this)}
            containerElement={<Link to="/posts"/>}  />

          </Drawer>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    title: state.headerTitle,
  }
}

export default connect(mapStateToProps)(MainLayout)

// <li><Link to={`/login`}>Login</Link></li>
// <li><Link onClick={this.logout.bind(this)}>Logout</Link></li>
// <li><Link to={`/register`}>Register</Link></li>
// <li><Link to={`/email-verification`}>Email Verification</Link></li>
// <li><Link to={`/profile`}>Profile</Link></li>
// <li><Link to={`/change-password`}>Change Password</Link></li>
// <li><Link to={`/recover-password`}>Recover Password</Link></li>
