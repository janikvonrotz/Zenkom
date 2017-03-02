import React from 'react'
import { Card, CardText, CircularProgress, FlatButton, Dialog,
  TextField, RaisedButton, SelectField, MenuItem } from 'material-ui'
import { setHeaderTitle, updateRouter, insertRouter, removeRouter } from '../actions'

class Router extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      type: '',
      status: '',
      profile:'',
      openRemoveDialog: false,
    }
  }

  mutate(event) {
    event.preventDefault()

    let { router = {}, dispatch } = this.props
    let { type, status } = this.state
    let { vehicle_id, dfi_name, router_version, serial_number, spos_id,
      ip_router, ip_cashbox, sim1, sim2, sim_itt, phone1, phone2,
      phone_itt } = this.refs
    router.vehicle_id = vehicle_id.getValue()
    router.dfi_name = dfi_name.getValue()
    router.router_version = router_version.getValue()
    router.type = type
    router.serial_number = serial_number.getValue()
    router.spos_id = spos_id.getValue()
    router.status = status
    router.ip_router = ip_router.getValue()
    router.ip_cashbox = ip_cashbox.getValue()
    router.sim1 = sim1.getValue()
    router.sim2 = sim2.getValue()
    router.sim_itt = sim_itt.getValue()
    router.phone1 = phone1.getValue()
    router.phone2 = phone2.getValue()    
    router.phone_itt = phone_itt.getValue()

    router._id ? dispatch(updateRouter(router)) : dispatch(insertRouter(router))
  }

  remove(){
    let { router, dispatch } = this.props
    dispatch(removeRouter(router._id))
  }

  updateSelectField(field, event, index, value){
    let state = {}
    state[field] = value
    this.setState(state)
  }

  toggleDialog(field){
    let state = {}
    state[field] = !this.state[field]
    this.setState(state)
  }

  componentWillReceiveProps(nextProps){
    let { dispatch, router } = nextProps
    this.setState({
      type: router ? router.type : '',
      status: router ? router.status : '',
      profile: router ? router.profile : '',
    })
    dispatch(setHeaderTitle(router ? `Router ${ router.vehicle_id || router.dfi_name }` : 'Untitled'))
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
          required={ true }
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

          <TextField
          defaultValue={ router.sim1 }
          type="text"
          ref="sim1"
          floatingLabelText={ i18n.label.sim1 }  />
          <br />

          <TextField
          defaultValue={ router.sim2 }
          type="text"
          ref="sim2"
          floatingLabelText={ i18n.label.sim2 }  />
          <br />

          <TextField
          defaultValue={ router.sim_itt }
          type="text"
          ref="sim_itt"
          required={ true }
          floatingLabelText={ i18n.label.sim_itt }  />
          <br />

          <TextField
          defaultValue={ router.phone1 }
          type="text"
          ref="phone1"
          floatingLabelText={ i18n.label.phone1 }  />
          <br />

          <TextField
          defaultValue={ router.phone2 }
          type="text"
          ref="phone2"
          floatingLabelText={ i18n.label.phone2 }  />
          <br />

          <TextField
          defaultValue={ router.phone_itt }
          type="text"
          ref="phone_itt"
          floatingLabelText={ i18n.label.phone_itt }  />
          <br />

          <br />
          <RaisedButton
          type="submit"
          label={ i18n.button.update }
          primary={ true } />

          <RaisedButton
          onTouchTap={ this.toggleDialog.bind(this, 'openRemoveDialog') }
          label={ i18n.button.remove }
          secondary={ true } />

          <Dialog
          title={ `${i18n.vocabulary.router} ${ router.vehicle_id || router.dfi_name } ${i18n.button.remove}` }
          actions={ actions }
          modal={ true }
          open={ this.state.openRemoveDialog }>
            { i18n.question.confirm_delete_router }
          </Dialog>

        </form>
      </CardText>
    </Card>
  }
}

export default Router
