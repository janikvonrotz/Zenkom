import React from 'react'
import { connect } from 'react-redux'
import { RaisedButton, Card, CardText } from 'material-ui'
import { setHeaderTitle, sendEmailVerification, verifyEmail } from '../actions'

class EmailVerification extends React.Component {

  send(){
    let { dispatch } = this.props
    dispatch(sendEmailVerification())
  }

  componentDidMount(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.button.verificate_email))
    let { token } = this.props.params
    token ? dispatch(verifyEmail(token)) : null
  }
  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.button.verificate_email))
  }

  render() {
    let { user, i18n } = this.props
    let emailVerified = user ? user.emails[0].verified : false
    let { token } = this.props.params

    return <Card>
      { !emailVerified && !token ? <CardText>
        <p>{ i18n.hint.check_verification_email }</p>
        <RaisedButton
        label={ i18n.button.resend_email_verification }
        primary={ true }
        onTouchTap={ this.send.bind(this) } />
      </CardText> : null }

      { emailVerified ? <CardText>
        <p>{ i18n.hint.email_is_verified }</p>
      </CardText> : null }

      { !emailVerified && token ? <CardText>
        <p>{ i18n.hint.email_is_not_verified }</p>
        <RaisedButton
        primary={ true }
        label={ i18n.button.resend_email_verification }
        onTouchTap={ this.send.bind(this) } />
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
export default connect(mapStateToProps)(EmailVerification)
