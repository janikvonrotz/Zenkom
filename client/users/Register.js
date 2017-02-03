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
    registerUser(user, dispatch)
  }

  componentDidMount(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Register'))
  }
  componentWillReceiveProps(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Register'))
  }

  render() {
    return (
      <Card>
        <CardText>
          <form onSubmit={this.register.bind(this)}>

            <TextField
            type="firstname"
            ref="firstname"
            required="true"
            floatingLabelText="Firstname" />
            <br />

            <TextField
            type="lastname"
            ref="lastname"
            required="true"
            floatingLabelText="Lastname" />
            <br />

            <TextField
            type="username"
            ref="username"
            required="true"
            floatingLabelText="Username" />
            <br />

            <TextField
            type="email"
            ref="email"
            required="true"
            floatingLabelText="Email" />
            <br />

            <TextField
            type="password"
            ref="password"
            required="true"
            floatingLabelText="Password" />
            <br />

            <RaisedButton
            label="Register"
            primary={ true }
            type="submit" />

          </form>
          <p>Already have an account? <Link to="/login">Login</Link>.</p>
        </CardText>
      </Card>
    )
  }
}

export default connect()(Register)
