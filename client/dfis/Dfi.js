import React from 'react'
import { Card, CardText, CircularProgress, FlatButton, Dialog, DatePicker,
  TextField, RaisedButton, SelectField, MenuItem } from 'material-ui'
import { setHeaderTitle, updateDfi, insertDfi,
removeDfi } from '../actions'
import { formatDate } from '/imports/helpers'
import { isAllowed } from '/imports/helpers'

class Dfi extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      openRemoveDialog: false,
    }
  }

  mutate(event) {
    event.preventDefault()

    let { dfi = {}, dispatch } = this.props
    let { description } = this.refs
    dfi.description = description.getValue()

    dfi._id ? dispatch(updateDfi(dfi)) : dispatch(insertDfi(dfi))
  }

  remove(){
    let { dfi, dispatch } = this.props
    dispatch(removeDfi(dfi._id))
  }

  updateSelectField(field, event, index, value){
    let state = {}
    if (index instanceof Date) {
        state[field] = index
    } else {
        state[field] = value
    }
    this.setState(state)
  }

  toggleDialog(field){
    let state = {}
    state[field] = !this.state[field]
    this.setState(state)
  }

  componentWillReceiveProps(nextProps){
    let { dispatch, dfi={}, i18n } = nextProps
    dispatch(setHeaderTitle(dfi._id ? `${ i18n.vocabulary.dfi } ${ dfi.description }` : i18n.vocabulary.untitled ))
  }

  render() {
    let { dfi={}, loading, i18n, user } = this.props

    const actions = [
      <FlatButton
      label={ i18n.button.cancel }
      primary={ true }
      onTouchTap={ this.toggleDialog.bind(this, 'openRemoveDialog') }
      />,
      <FlatButton
      onTouchTap={ this.remove.bind(this) }
      label={ i18n.button.remove }
      secondary={ true } />,
    ]

    return loading ? <CircularProgress /> : <Card>
      <CardText>
        <form onSubmit={ this.mutate.bind(this) }>

          <TextField
          defaultValue={ dfi.description || '' }
          type="text"
          ref="description"
          required={ true }
          floatingLabelText={ i18n.label.description }  />
          <br />

          { isAllowed('dfis.update', user ? user.roles : null) ?
          <RaisedButton
          type="submit"
          style={{ marginRight: 10 }}
          label={ i18n.button.update }
          primary={ true } />
          : null }

          { isAllowed('dfis.remove', user ? user.roles : null) ?
          <RaisedButton
          onTouchTap={ this.toggleDialog.bind(this, 'openRemoveDialog') }
          label={ i18n.button.remove }
          secondary={ true } />
          : null }

          <Dialog
          title={ `${i18n.vocabulary.dfi} ${ dfi.description } ${i18n.button.remove}` }
          actions={ actions }
          modal={ false }
          onRequestClose={ this.toggleDialog.bind(this, 'openRemoveDialog') }
          open={ this.state.openRemoveDialog }>
            { i18n.question.confirm_delete_dfi }
          </Dialog>

        </form>

        <br />
        <small>{ `${ i18n.label.updated_at }: ${ dfi.updated_at ? formatDate(i18n.locale, dfi.updated_at) : '-' }` }</small><br />
        <small>{ `${ i18n.label.updated_by }: ${ dfi.updated_by ? dfi.updated_by : '-' }` }</small><br />
        <small>{ `${ i18n.label.created_at }: ${ dfi.created_at ? formatDate(i18n.locale, dfi.created_at) : '-' }` }</small><br />
        <small>{ `${ i18n.label.created_by }: ${ dfi.created_by ? dfi.created_by : '-' }` }</small>

      </CardText>
    </Card>
  }
}

export default Dfi
