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
    let { user, i18n } = this.props

    return <Card>
      <CardText>
      <List>
         <ListItem
           primaryText="When calls and notifications arrive"
           secondaryText="Always interrupt"
         />
       </List>
       <Divider />
       <List>
         <Subheader>Priority Interruptions</Subheader>
         <ListItem primaryText="Events and reminders" rightToggle={<Toggle />} />
         <ListItem primaryText="Calls" rightToggle={<Toggle />} />
         <ListItem primaryText="Messages" rightToggle={<Toggle />} />
       </List>
       <Divider />
       <List>
         <Subheader>Hangout Notifications</Subheader>
         <ListItem primaryText="Notifications" leftCheckbox={<Checkbox />} />
         <ListItem primaryText="Sounds" leftCheckbox={<Checkbox />} />
         <ListItem primaryText="Video sounds" leftCheckbox={<Checkbox />} />
       </List>
      </CardText>
    </Card>
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    i18n: state.i18n,
  }
}
export default connect(mapStateToProps)(Profile)
