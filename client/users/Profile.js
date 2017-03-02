import React from 'react'
import { connect } from 'react-redux'
import { TextField, RaisedButton, Card, CardText } from 'material-ui'
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

  // change(event) {
  //   event.preventDefault()
  //   let { dispatch } = this.props
  //   let { oldPassword, newPassword, repeatPassword } = this.refs
  //   changePassword(oldPassword.getValue(), newPassword.getValue(), repeatPassword.getValue(), dispatch)
  // }

  componentDidMount(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.button.profile))
  }
  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.button.profile))
  }

  render() {
    let { user, i18n } = this.props

    return <Card>
      { user ? <CardText>
        <form onSubmit={this.update.bind(this)}>

          <TextField
          defaultValue={ user.profile.firstname }
          type="text"
          ref="firstname"
          required="true"
          floatingLabelText={ i18n.label.firstname } />
          <br />

          <TextField
          defaultValue={ user.profile.lastname }
          type="text"
          ref="lastname"
          required="true"
          floatingLabelText={ i18n.label.lastname } />
          <br />

          <RaisedButton
          label={ i18n.button.update }
          primary={ true }
          type="submit" />

        </form>
      </CardText> : null }
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

// <TextField
// defaultValue={ user.username }
// type="text"
// ref="username"
// required="true"
// floatingLabelText="Username" />
// <br />
//
// <TextField
// defaultValue={ user.emails[0].address }
// type="email"
// ref="email"
// required="true"
// floatingLabelText="Email" />
// <br />
//
// <TextField
// type="password"
// ref="oldPassword"
// required="true"
// floatingLabelText="Old Password" />
// <br />
//
// <TextField
// type="password"
// ref="newPassword"
// required="true"
// floatingLabelText="New Password" />
// <br />
//
// <TextField
// type="password"
// ref="repeatPassword"
// required="true"
// floatingLabelText="Repeat Password" />
// <br />
