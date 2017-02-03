import React from 'react'
import { connect } from 'react-redux'
import { TextField, RaisedButton, Card, CardText } from 'material-ui'
import { setHeaderTitle, updateProfile, changePassword } from '../actions'

class Profile extends React.Component {

  update(event) {
    event.preventDefault()
    let { dispatch } = this.props
    let { firstname, lastname } = this.refs
    let profile = {
      firstname: firstname.getValue(),
      lastname: lastname.getValue(),
    }
    updateProfile(profile, dispatch)
  }

  change(event) {
    event.preventDefault()
    let { dispatch } = this.props
    let { oldPassword, newPassword, repeatPassword } = this.refs
    changePassword(oldPassword.getValue(), newPassword.getValue(), repeatPassword.getValue(), dispatch)
  }

  componentDidMount(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Profile'))
  }
  componentWillReceiveProps(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Profile'))
  }

  render() {
    let { user } = this.props
    return <Card>
      { user ? <CardText>
        <form onSubmit={this.update.bind(this)}>

          <TextField
          defaultValue={ user.profile.firstname }
          type="text"
          ref="firstname"
          required="true"
          floatingLabelText="Firstname" />
          <br />

          <TextField
          defaultValue={ user.profile.lastname }
          type="text"
          ref="lastname"
          required="true"
          floatingLabelText="Lastname" />
          <br />

          <TextField
          defaultValue={ user.username }
          type="text"
          ref="username"
          required="true"
          disabled={ true }
          floatingLabelText="Username" />
          <br />

          <TextField
          defaultValue={ user.emails[0].address }
          type="email"
          ref="email"
          required="true"
          disabled={ true }
          floatingLabelText="Email" />
          <br />

          <TextField
          type="password"
          ref="oldPassword"
          required="true"
          floatingLabelText="Old Password" />
          <br />

          <TextField
          type="password"
          ref="newPassword"
          required="true"
          floatingLabelText="New Password" />
          <br />

          <TextField
          type="password"
          ref="repeatPassword"
          required="true"
          floatingLabelText="Repeat Password" />
          <br />

          <RaisedButton
          label="Save"
          primary={ true }
          type="submit" />

        </form>
      </CardText> : null }
    </Card>
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Profile)
