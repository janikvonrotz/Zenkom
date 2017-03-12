import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Subheader, Divider, Toggle, Checkbox, Card,
  CardText } from 'material-ui'
import { setHeaderTitle, updateProfile } from '../actions'

class Profile extends React.Component {

  update(event) {
    event.preventDefault()
    let { dispatch } = this.props
    let { firstname, lastname } = this.refs
    let profile = {
      firstname: firstname.getValue(),
      lastname: lastname.getValue(),
    }
    dispatch(updateProfile(profile))
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

    return <Card>
      <CardText>
       <List>
         <Subheader>{ i18n.vocabulary.notification_channels }</Subheader>
         { channelOptions.map((option) => {
           return <ListItem
             key={ option }
             value={ option }
             rightToggle={<Toggle />}
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
             leftCheckbox={ <Checkbox /> }
             primaryText={ i18n.option[option] } />
         })}
       </List>
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
