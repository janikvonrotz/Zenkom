import React from 'react'
import { connect } from 'react-redux'
import { Dialog, RaisedButton, FlatButton, TextField } from 'material-ui'
import { insertFeedback } from '../actions'
import { CommunicationMessage } from 'material-ui/svg-icons'

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
    return <div style={{ float: 'right' }}>

      <RaisedButton
      label="Feedback"
      primary={ true }
      icon={ <CommunicationMessage /> }
      onTouchTap={ this.toggleDialog.bind(this) } />

      <Dialog
      title="Feedback"
      actions={ [
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
      ] }
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
