import React from 'react'
import { Card, CardText, CircularProgress, FlatButton, Dialog, DatePicker,
  TextField, RaisedButton, SelectField, MenuItem, List, ListItem,
  Subheader } from 'material-ui'
import { setHeaderTitle, updateRouter, insertRouter,
  removeRouter } from '../actions'
import { Row, Col, BoxRow } from '../flexboxgrid'

class Router extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      type: '',
      status: '',
      profile:'',
      transport_company: '',
      installed_at: '',
      openRemoveDialog: false,
    }
  }

  mutate(event) {
    event.preventDefault()

    let { router = {}, dispatch } = this.props
    let { type, status, profile, transport_company, installed_at } = this.state
    let { vehicle_number, dfi_name, router_version, serial_number, spos_id,
      ip_router, ip_cashbox, sim1, sim2, sim_itt, phone1, phone2,
      phone_itt, notes } = this.refs
    router.vehicle_number = vehicle_number.getValue()
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
    router.profile = profile
    router.notes = notes.getValue()
    router.transport_company = transport_company
    router.installed_at = installed_at

    router._id ? dispatch(updateRouter(router)) : dispatch(insertRouter(router))
  }

  remove(){
    let { router, dispatch } = this.props
    dispatch(removeRouter(router._id))
  }

  updateSelectField(field, event, index, value){
    let state = {}
    if(index instanceof Date) {
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
    let { dispatch, router } = nextProps
    this.setState({
      type: router ? router.type : '',
      status: router ? router.status : '',
      profile: router ? router.profile : '',
      transport_company: router ? router.transport_company : '',
      installed_at: router ? router.installed_at : null,
    })
    dispatch(setHeaderTitle(router ? `Router ${ router.vehicle_number || router.dfi_name }` : 'Untitled'))
  }

  render() {
    let { router, loading, i18n } = this.props
    let { type, status, profile, transport_company, installed_at } = this.state

    if (!router) {
      router = {
        vehicle_number: '',
        dfi_name: '',
        router_version: '',
        type: '',
        serial_number: '',
        spos_id: '',
        status: '',
        ip_router: '',
        ip_cashbox: '',
        sim1: '',
        sim2: '',
        sim_itt: '',
        phone1: '',
        phone2: '',
        phone_itt: '',
        profile: '',
        notes: '',
        transport_company: '',
        installed_at: null,
        history: []
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

          <Row>
            <Col xs="12" sm="6" md="6" lg="6">
              <BoxRow>

                <TextField
                defaultValue={ router.vehicle_number }
                type="number"
                ref="vehicle_number"
                floatingLabelText={ i18n.label.vehicle_number } />
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
                 <MenuItem value={ 'NB2700-LU' } primaryText="NB2700-LU" />
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

              </BoxRow>
            </Col>
            <Col xs="12" sm="6" md="6" lg="6">
              <BoxRow>

                <TextField
                defaultValue={ router.sim1 }
                type="number"
                ref="sim1"
                floatingLabelText={ i18n.label.sim1 }  />
                <br />

                <TextField
                defaultValue={ router.sim2 }
                type="number"
                ref="sim2"
                floatingLabelText={ i18n.label.sim2 }  />
                <br />

                <TextField
                defaultValue={ router.sim_itt }
                type="number"
                ref="sim_itt"
                required={ true }
                floatingLabelText={ i18n.label.sim_itt }  />
                <br />

                <TextField
                defaultValue={ router.phone1 }
                type="number"
                ref="phone1"
                floatingLabelText={ i18n.label.phone1 }  />
                <br />

                <TextField
                defaultValue={ router.phone2 }
                type="number"
                ref="phone2"
                floatingLabelText={ i18n.label.phone2 }  />
                <br />

                <TextField
                defaultValue={ router.phone_itt }
                type="number"
                ref="phone_itt"
                floatingLabelText={ i18n.label.phone_itt }  />
                <br />

                <SelectField
                floatingLabelText={ i18n.label.profile }
                value={ profile }
                required={ true }
                onChange={ this.updateSelectField.bind(this, 'profile') }>
                 <MenuItem value={ '2GB' } primaryText="2GB" />
                 <MenuItem value={ '1GB' } primaryText="1GB" />
                </SelectField>
                <br />

                <TextField
                defaultValue={ router.notes }
                type="text"
                multiLine={ true }
                ref="notes"
                floatingLabelText={ i18n.label.notes }  />
                <br />

                <SelectField
                floatingLabelText={ i18n.label.transport_company }
                value={ transport_company }
                required={ true }
                onChange={ this.updateSelectField.bind(this, 'transport_company') }>
                 <MenuItem value={ 'vbl' } primaryText="vbl" />
                 <MenuItem value={ 'Rottal Auto AG' } primaryText="Rottal Auto AG" />
                </SelectField>
                <br />

                <br />
                <DatePicker
                value={ installed_at }
                floatingLabelText={ i18n.label.installed_at }
                onChange={ this.updateSelectField.bind(this, 'installed_at') }
                hintText={ i18n.label.installed_at } />

              </BoxRow>
            </Col>
          </Row>

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
          title={ `${i18n.vocabulary.router} ${ router.vehicle_number || router.dfi_name } ${i18n.button.remove}` }
          actions={ actions }
          modal={ true }
          open={ this.state.openRemoveDialog }>
            { i18n.question.confirm_delete_router }
          </Dialog>

        </form>

        <br />
        <List>
          <Subheader>{ i18n.label.history }</Subheader>
          { router.history.map((version) => {
            return <ListItem
              key={ version._id }
              primaryText={ version.date.toISOString() }
              secondaryText={ `${ i18n.label.created_by }: ${ version.user }` } />
          }) }
        </List>

        <br />
        <small>{ `${ i18n.label.updated_at }: ${ router.updated_at ? router.updated_at.toISOString() : '-' }` }</small><br />
        <small>{ `${ i18n.label.updated_by }: ${ router.updated_by ? router.updated_by : '-' }` }</small><br />
        <small>{ `${ i18n.label.created_at }: ${ router.created_at ? router.created_at.toISOString() : '-' }` }</small><br />
        <small>{ `${ i18n.label.created_by }: ${ router.created_by ? router.created_by : '-' }` }</small>

      </CardText>
    </Card>
  }
}

export default Router
