import React from 'react'
import { connect } from 'react-redux'
import { Dialog, RaisedButton, FlatButton, TextField } from 'material-ui'
import { Meteor } from 'meteor/meteor'

class FeedbackForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      openFeedbackDialog: false,
    }
  }

  toggleDialog() {
    this.setState({ openFeedbackDialog: !this.state.openFeedbackDialog })
  }

  insert() {
    let { dispatch } = this.props
    let { message, name } = this.refs

    let feedback = {
      name: name.getValue(),
      message: message.getValue(),
      url: window.location.href,
    }

    Meteor.call('feedbacks.insert', feedback, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: 'Feedback wurde verschickt.',
        })
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })

    this.toggleDialog()
  }

  render() {
    let actions = [
      <FlatButton
        label="Abrechen"
        primary={ false }
        onTouchTap={ this.toggleDialog.bind(this) }
      />,
      <FlatButton
        label="Senden"
        primary={ true }
        onTouchTap={ this.insert.bind(this) }
      />,
    ]

    return <div style={{ float: 'right' }}>

      <RaisedButton
      label="Feedback"
      primary={ true }
      onTouchTap={ this.toggleDialog.bind(this) } />

      <Dialog
      title="Feedback"
      actions={ actions }
      modal={ false }
      onRequestClose={ this.toggleDialog.bind(this) }
      open={ this.state.openFeedbackDialog } >

        <TextField
        type="text"
        ref="name"
        floatingLabelText={ 'Name' }  />
        <br />

        <TextField
        type="text"
        multiLine={ true }
        ref="message"
        fullWidth={ true }
        floatingLabelText={ 'Nachricht' }  />

      </Dialog>

    </div>
  }
}

export default connect()(FeedbackForm)
