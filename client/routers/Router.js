import React from 'react'
import { Card, CardText, CircularProgress,
  TextField, RaisedButton, SelectField, MenuItem } from 'material-ui'
import { setHeaderTitle, updateRouter, insertRouter } from '../actions'

class Router extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      type: 1,
      status: ''
    }
  }

  mutate(event) {
    event.preventDefault()

    let { router = {}, dispatch } = this.props
    let { type, status } = this.state
    let { vehicle_id, dfi_name, router_version, serial_number, spos_id,
      ip_router, ip_cashbox } = this.refs
    router.vehicle_id = vehicle_id.getValue()
    router.dfi_name = dfi_name.getValue()
    router.router_version = router_version.getValue()
    router.type = type
    router.serial_number = serial_number.getValue()
    router.spos_id = spos_id.getValue()
    router.status = status
    router.ip_router = ip_router.getValue()
    router.ip_cashbox = ip_cashbox.getValue()

    router._id ? updateRouter(router, dispatch) : insertRouter(router, dispatch)
  }

  updateSelectField(field, event, index, value){
    let state = {}
    state[field] = value
    this.setState(state)
  }

  componentWillReceiveProps(nextProps){
    let { dispatch, router, router: { type, status } } = nextProps
    this.setState({
      type: type,
      status: status,
    })
    dispatch(setHeaderTitle(router ? 'Router' : 'Untitled'))
  }

  render() {
    let { router, loading, i18n } = this.props
    let { type, status } = this.state

    if (!router) {
      router = {
        vehicle_id: '',
        dfi_name: '',
        router_version: '',
        type: '',
        serial_number: '',
        spos_id: '',
        status: '',
        ip_router: '',
        ip_cashbox: '',
      }
    }

    return loading ? <CircularProgress /> : <Card>
      <CardText>
        <form onSubmit={ this.mutate.bind(this) }>

          <TextField
          defaultValue={ router.vehicle_id }
          type="text"
          ref="vehicle_id"
          floatingLabelText={ i18n.label.vehicle_id } />
          <br />

          <TextField
          defaultValue={ router.dfi_name }
          type="text"
          ref="dfi_name"
          floatingLabelText={ i18n.label.dfi_name }  />
          <br />

          <TextField
          defaultValue={ router.router_version }
          type="text"
          ref="router_version"
          floatingLabelText={ i18n.label.router_version }  />
          <br />

          <SelectField
          floatingLabelText={ i18n.label.type }
          value={ type }
          required={ true }
          onChange={ this.updateSelectField.bind(this, 'type') }>
           <MenuItem value={ 'NB2541' } primaryText="NB2541" />
           <MenuItem value={ 'NB2542' } primaryText="NB2542" />
          </SelectField>
          <br />

          <TextField
          defaultValue={ router.serial_number }
          type="text"
          ref="serial_number"
          floatingLabelText={ i18n.label.serial_number }  />
          <br />

          <TextField
          defaultValue={ router.spos_id }
          type="text"
          ref="spos_id"
          floatingLabelText={ i18n.label.spos_id }  />
          <br />

          <SelectField
          floatingLabelText={ i18n.label.status }
          value={ status }
          required={ true }
          onChange={ this.updateSelectField.bind(this, 'status') }>
           <MenuItem value={ 'In Betrieb' } primaryText="In Betrieb" />
           <MenuItem value={ 'Defekt' } primaryText="Defekt" />
          </SelectField>
          <br />

          <TextField
          defaultValue={ router.ip_router }
          type="text"
          ref="ip_router"
          floatingLabelText={ i18n.label.ip_router }  />
          <br />

          <TextField
          defaultValue={ router.ip_cashbox }
          type="text"
          ref="ip_cashbox"
          floatingLabelText={ i18n.label.ip_cashbox }  />
          <br />
          <br />

          <RaisedButton
          type="submit"
          label={ i18n.button.save }
          primary={ true } />
        </form>
      </CardText>
    </Card>
  }
}

export default Router
