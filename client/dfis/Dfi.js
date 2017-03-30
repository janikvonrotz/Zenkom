import React from 'react'
import { Card, CardText, CircularProgress, FlatButton, Dialog,
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
      type: '',
      row_type: '',
    }
  }

  mutate(event) {
    event.preventDefault()

    let { dfi = {}, dispatch } = this.props
    let { type, row_type } = this.state
    let { description, location, notes } = this.refs

    dfi.description = description.getValue()
    dfi.location = location.getValue()
    dfi.notes = notes.getValue()
    dfi.type = type
    dfi.row_type = row_type

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
    this.setState({
      type: dfi.type || '',
      row_type: dfi.row_type || '',
    })
    dispatch(setHeaderTitle(dfi._id ? `${ i18n.vocabulary.dfi } ${ dfi.description }` : i18n.vocabulary.untitled ))
  }

  render() {
    let { type, row_type } = this.state
    let { dfi={}, loading, i18n, user, typeOptions, rowTypeOptions } = this.props

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

          <SelectField
          floatingLabelText={ i18n.label.type }
          value={ type }
          required={ true }
          onChange={ this.updateSelectField.bind(this, 'type') }>
            { typeOptions.map((option) => {
              return <MenuItem
                key={ option }
                value={ option }
                primaryText={ option } />
            })}
          </SelectField>
          <br />

          <SelectField
          floatingLabelText={ i18n.label.row_type }
          value={ row_type }
          required={ true }
          onChange={ this.updateSelectField.bind(this, 'row_type') }>
            { rowTypeOptions.map((option) => {
              return <MenuItem
                key={ option }
                value={ option }
                primaryText={ option } />
            })}
          </SelectField>
          <br />

          <TextField
          defaultValue={ dfi.location || '' }
          type="text"
          ref="location"
          floatingLabelText={ i18n.label.location }  />
          <br />

          <TextField
          defaultValue={ dfi.notes || '' }
          type="text"
          ref="notes"
          multiLine={ true }
          floatingLabelText={ i18n.label.notes }  />
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
