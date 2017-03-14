import React from 'react'
import { connect } from 'react-redux'
import { TextField, RaisedButton, Card, CardText } from 'material-ui'
import { setHeaderTitle, updateUserProfile } from '../actions'

class Profile extends React.Component {

  update(event) {
    event.preventDefault()
    let { dispatch } = this.props
    let { firstname, lastname } = this.refs
    let profile = {
      firstname: firstname.getValue(),
      lastname: lastname.getValue(),
    }
    dispatch(updateUserProfile(profile))
  }

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
