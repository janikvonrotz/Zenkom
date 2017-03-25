import React from 'react'
import { Card, CardText, CircularProgress, FlatButton, Dialog, DatePicker,
  TextField, RaisedButton, SelectField, MenuItem } from 'material-ui'
import { setHeaderTitle, updateVehicle, insertVehicle,
removeVehicle } from '../actions'
import { formatDate } from '/imports/helpers'
import { isAllowed } from '/imports/helpers'

class Vehicle extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      status: '',
      modification_until: '',
      openRemoveDialog: false,
    }
  }

  mutate(event) {
    event.preventDefault()

    let { vehicle = {}, dispatch } = this.props
    let { status, modification_until } = this.state
    let { number } = this.refs
    vehicle.number = number.getValue()
    vehicle.status = status
    vehicle.modification_until = status === 'vehicle_upgrade' ? modification_until : null

    vehicle._id ? dispatch(updateVehicle(vehicle)) : dispatch(insertVehicle(vehicle))
  }

  remove(){
    let { vehicle, dispatch } = this.props
    dispatch(removeVehicle(vehicle._id))
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
    let { dispatch, vehicle={}, i18n } = nextProps
    this.setState({
      status: vehicle.status || '',
      modification_until: vehicle.modification_until || null,
    })
    dispatch(setHeaderTitle(vehicle._id ? `${ i18n.vocabulary.vehicle } ${ vehicle.number }` : i18n.vocabulary.untitled ))
  }

  render() {
    let { vehicle={}, loading, i18n, statusOptions, user } = this.props
    let { status, modification_until } = this.state

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
          defaultValue={ vehicle.number || '' }
          type="text"
          ref="number"
          required={ true }
          floatingLabelText={ i18n.label.number }  />
          <br />

          <SelectField
          floatingLabelText={ i18n.label.status }
          value={ status }
          required={ true }
          autoWidth={ true }
          onChange={ this.updateSelectField.bind(this, 'status') }>
            { statusOptions.map((option) => {
              return <MenuItem
                key={ option }
                value={ option }
                primaryText={ i18n.option[option] } />
            })}
          </SelectField>
          <br />

          { status === 'vehicle_upgrade' ? <span>
            <DatePicker
            value={ modification_until }
            floatingLabelText={ i18n.label.modification_until || null }
            onChange={ this.updateSelectField.bind(this, 'modification_until') }
            hintText={ i18n.label.modification_until } />
          </span> : null }
          <br />

          { isAllowed('vehicles.update', user ? user.roles : null) ?
          <RaisedButton
          type="submit"
          style={{ marginRight: 10 }}
          label={ i18n.button.update }
          primary={ true } />
          : null }

          { isAllowed('vehicles.remove', user ? user.roles : null) ?
          <RaisedButton
          onTouchTap={ this.toggleDialog.bind(this, 'openRemoveDialog') }
          label={ i18n.button.remove }
          secondary={ true } />
          : null }

          <Dialog
          title={ `${i18n.vocabulary.vehicle} ${ vehicle.number } ${i18n.button.remove}` }
          actions={ actions }
          modal={ false }
          onRequestClose={ this.toggleDialog.bind(this, 'openRemoveDialog') }
          open={ this.state.openRemoveDialog }>
            { i18n.question.confirm_delete_vehicle }
          </Dialog>

        </form>

        <br />
        <small>{ `${ i18n.label.updated_at }: ${ vehicle.updated_at ? formatDate(i18n.locale, vehicle.updated_at) : '-' }` }</small><br />
        <small>{ `${ i18n.label.updated_by }: ${ vehicle.updated_by ? vehicle.updated_by : '-' }` }</small><br />
        <small>{ `${ i18n.label.created_at }: ${ vehicle.created_at ? formatDate(i18n.locale, vehicle.created_at) : '-' }` }</small><br />
        <small>{ `${ i18n.label.created_by }: ${ vehicle.created_by ? vehicle.created_by : '-' }` }</small>

      </CardText>
    </Card>
  }
}

export default Vehicle
