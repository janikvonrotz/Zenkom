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
    dispatch(resetPassword(password.getValue(), repeatPassword.getValue(), token))
  }

  recover(event){
    event.preventDefault()
    let { email } = this.refs
    let { dispatch } = this.props
    dispatch(recoverPassword(email.getValue()))
  }

  componentDidMount(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.button.recover_password))
  }
  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.button.recover_password))
  }

  render() {
    let { i18n, params } = this.props
    let { token } = params

    return <Card>
      { token ? <CardText>
        <p>{ i18n.hint.set_new_password }</p>
        <form onSubmit={ this.reset.bind(this) }>

          <TextField
          type="password"
          ref="password"
          required="true"
          floatingLabelText={ i18n.label.password } />
          <br />

          <TextField
          type="password"
          ref="repeatPassword"
          required="true"
          floatingLabelText={ i18n.label.repeat_password } />
          <br />

          <RaisedButton
          label={ i18n.button.reset_password }
          primary={ true }
          type="submit" />

        </form>
      </CardText> : null }

      { !token ? <CardText>
        <p>{ i18n.hint.send_password_reset_link }</p>
        <form onSubmit={ this.recover.bind(this) }>

          <TextField
          type="email"
          ref="email"
          required="true"
          floatingLabelText={ i18n.label.email } />
          <br />

          <RaisedButton
          label={ i18n.button.recover_password }
          primary={ true }
          type="submit" />

        </form>
      </CardText> : null }
    </Card>
  }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
  }
}
export default connect(mapStateToProps)(RecoverPassword)
