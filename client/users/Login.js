import React from 'react'
import { connect } from 'react-redux'
import { TextField, RaisedButton, Card, CardText } from 'material-ui'
import { Link } from 'react-router'
import { setHeaderTitle, loginUser } from '../actions'

class Login extends React.Component {

  login(event){
    event.preventDefault()
    let { dispatch } = this.props
    let { email, password } = this.refs;
    loginUser(email.getValue(), password.getValue(), dispatch)
  }

  componentDidMount(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Login'))
  }
  componentWillReceiveProps(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Login'))
  }

  render() {
    return (
      <Card>
        <CardText>
          <form onSubmit={this.login.bind(this)}>
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

            <p><Link to="/recover-password">Forgot Password?</Link></p>

            <RaisedButton
            label="Login"
            primary={ true }
            type="submit"/>
          </form>

          <p>Dont have an account? <Link to="/register">Register</Link>.</p>
        </CardText>
      </Card>
    )
  }
}

export default connect()(Login)
