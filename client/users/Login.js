import React from 'react'
import { connect } from 'react-redux'
import { TextField, RaisedButton, Card, CardText } from 'material-ui'
import { Link } from 'react-router'
import { setHeaderTitle, loginUser, loginUserWithLDAP } from '../actions'

class Login extends React.Component {

  login(event){
    event.preventDefault()
    let { dispatch } = this.props
    let { email, password } = this.refs
    let { location: { query: { ldap } } } = this.props

    ldap ? dispatch(loginUserWithLDAP(email.getValue(), password.getValue())) :
    dispatch(loginUser(email.getValue(), password.getValue()))
  }

  componentDidMount(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.button.login))
  }
  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.button.login))
  }

  render() {
    let { i18n, location: { query: { ldap } } } = this.props
    return <Card>
      <CardText>
        <form onSubmit={ this.login.bind(this) }>
          <TextField
          defaultValue="einstein@ldap.forumsys.com"
          type="email"
          ref="email"
          required="true"
          floatingLabelText={ i18n.label.email } />
          <br />

          <TextField
          defaultValue="password"
          type="password"
          ref="password"
          required="true"
          floatingLabelText={ i18n.label.password } />
          <br />

          <p><Link to="/recover-password">{ i18n.question.forgot_password }</Link></p>

          <RaisedButton
          label={ i18n.button.login }
          primary={ true }
          type="submit" />
        </form>

        <p>{ i18n.question.not_have_account } <Link to="/register">{ i18n.button.register }</Link></p>
        { ldap ?
          <p><Link to="/login">{ i18n.hint.login_without_ldap }</Link></p> :
          <p><Link to="/login?ldap=true">{ i18n.hint.login_with_ldap } </Link></p> }
      </CardText>
    </Card>
  }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
  }
}
export default connect(mapStateToProps)(Login)
