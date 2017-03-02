import React from 'react'
import { connect } from 'react-redux'
import { TextField, RaisedButton, Card, CardText } from 'material-ui'
import { Link } from 'react-router'
import { setHeaderTitle, registerUser } from '../actions'

class Register extends React.Component {

  register(event) {
    event.preventDefault()

    let { dispatch } = this.props
    let { firstname, lastname, username, email, password } = this.refs
    let user = {
      username: username.getValue(),
      email: email.getValue(),
      password: password.getValue(),
      profile:{
        firstname: firstname.getValue(),
        lastname: lastname.getValue()
      },
    }
    dispatch(registerUser(user))
  }

  componentDidMount(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.button.register))
  }
  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.button.register))
  }

  render() {
    let { i18n } = this.props

    return (
      <Card>
        <CardText>
          <form onSubmit={this.register.bind(this)}>

            <TextField
            type="firstname"
            ref="firstname"
            required="true"
            floatingLabelText={ i18n.label.firstname } />
            <br />

            <TextField
            type="lastname"
            ref="lastname"
            required="true"
            floatingLabelText={ i18n.label.lastname } />
            <br />

            <TextField
            type="username"
            ref="username"
            required="true"
            floatingLabelText={ i18n.label.username } />
            <br />

            <TextField
            type="email"
            ref="email"
            required="true"
            floatingLabelText={ i18n.label.email } />
            <br />

            <TextField
            type="password"
            ref="password"
            required="true"
            floatingLabelText={ i18n.label.password } />
            <br />

            <RaisedButton
            label={ i18n.button.register }
            primary={ true }
            type="submit" />

          </form>
          <p>{ i18n.question.have_account } <Link to="/login">{ i18n.button.login }</Link>.</p>
        </CardText>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
  }
}
export default connect(mapStateToProps)(Register)
