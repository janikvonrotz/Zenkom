import React from 'react'
import { connect } from 'react-redux'
import { RaisedButton, Card, CardText } from 'material-ui'
import { setHeaderTitle, sendEmailVerification, verifyEmail } from '../actions'

class EmailVerification extends React.Component {

  send(){
    let { dispatch } = this.props
    sendEmailVerification(dispatch)
  }

  componentDidMount(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Email Verification'))
    let { token } = this.props.params
    token ? verifyEmail(token, dispatch) : null
  }
  componentWillReceiveProps(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Email Verification'))
  }

  render() {
    let { user } = this.props
    let emailVerified = user ? user.emails[0].verified : false
    let { token } = this.props.params

    return <Card>
      { !emailVerified && !token ? <CardText>
        <p>Please check your email account for a verification email.</p>
        <RaisedButton
        label="Resend Verification Email"
        primary={ true }
        onTouchTap={ this.send.bind(this) } />
      </CardText> : null }

      { emailVerified ? <CardText>
        <p>Your email has been verified.</p>
      </CardText> : null }

      { !emailVerified && token ? <CardText>
        <p>Email could not be verified.</p>
        <RaisedButton
        primary={ true }
        label="Resend Verification Email"
        onTouchTap={ this.send.bind(this) } />
      </CardText> : null }
    </Card>
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(EmailVerification)
