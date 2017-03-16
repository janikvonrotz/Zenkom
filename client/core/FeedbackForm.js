import React from 'react'
import { connect } from 'react-redux'
import { Dialog, RaisedButton, FlatButton, TextField } from 'material-ui'
import { insertFeedback } from '../actions'

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
    let { message } = this.refs

    let feedback = {
      message: message.getValue(),
      url: window.location.href,
    }

    dispatch(insertFeedback(feedback))

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
        multiLine={ true }
        ref="message"
        fullWidth={ true }
        floatingLabelText={ 'Nachricht' }  />

      </Dialog>

    </div>
  }
}

export default connect()(FeedbackForm)
