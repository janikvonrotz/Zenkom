import React from 'react'
import { connect } from 'react-redux'
import { TextField, RaisedButton, Card, CardText } from 'material-ui'
import { setHeaderTitle, resetPassword, recoverPassword } from '../actions'

class RecoverPassword extends React.Component {

  reset(event){
    event.preventDefault()
    let { password, repeatPassword } = this.refs
    let { dispatch } = this.props
    let { token } = this.props.params
    resetPassword(password.getValue(), repeatPassword.getValue(), token, dispatch)
  }

  recover(event){
    event.preventDefault()
    let { email } = this.refs
    let { dispatch } = this.props
    recoverPassword(email.getValue(), dispatch)
  }

  componentDidMount(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Recover Password'))
  }
  componentWillReceiveProps(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Recover Password'))
  }

  render() {
    let { token } = this.props.params

    return <Card>
      { token ? <CardText>
        <p>Reset your new password.</p>
        <form onSubmit={ this.reset.bind(this) }>

          <TextField
          type="password"
          ref="password"
          required="true"
          floatingLabelText="Password" />
          <br />

          <TextField
          type="password"
          ref="repeatPassword"
          required="true"
          floatingLabelText="Repeat Password" />
          <br />

          <RaisedButton
          label="Reset Password"
          primary={ true }
          type="submit" />

        </form>
      </CardText> : null }

      { !token ? <CardText>
        <p>Send password reset link.</p>
        <form onSubmit={ this.recover.bind(this) }>

          <TextField
          type="email"
          ref="email"
          required="true"
          floatingLabelText="Email" />
          <br />

          <RaisedButton
          label="Recover Password"
          primary={ true }
          type="submit" />

        </form>
      </CardText> : null }
    </Card>
  }
}

export default connect()(RecoverPassword)
