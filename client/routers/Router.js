import React from 'react'
import { Card, CardText, CircularProgress, FlatButton, Dialog, DatePicker,
  TextField, RaisedButton, SelectField, MenuItem, List, ListItem,
  Subheader, CardMedia } from 'material-ui'
import { ActionHistory } from 'material-ui/svg-icons'
import { setHeaderTitle, updateRouter, insertRouter, setRouterStatisticUrl,
  removeRouter } from '../actions'
import { Row, Col, BoxRow } from '../flexboxgrid'
import { Link } from 'react-router'
import { formatDate } from '/imports/helpers'
import { isAllowed } from '/imports/helpers'

class Router extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      vehicle_id: '',
      dfi_id: '',
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
    let { vehicle_id, dfi_id, type, status, profile, transport_company,
      installed_at } = this.state
    let { hostname, version, serial_number, spos_id, ip_router,
      ip_cashbox, sim1, sim2, sim_itt, phone1, phone2, phone_itt,
      notes } = this.refs
    router.hostname = hostname.getValue()
    router.vehicle_id = vehicle_id
    router.dfi_id = dfi_id
    router.version = version.getValue()
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
    let { dispatch, router={}, i18n, location } = nextProps

    // read params
    let { dfiId, vehicleId } = location.query

    this.setState({
      vehicle_id: router.vehicle_id ||  vehicleId || null,
      dfi_id: router.dfi_id || dfiId || null,
      type: router.type || '',
      status: router.status || '',
      profile: router.profile || '',
      transport_company: router.transport_company || '',
      installed_at: router.installed_at || null,
    })
    dispatch(setHeaderTitle(router._id ? `${ i18n.vocabulary.router } ${ router.hostname }` : i18n.vocabulary.untitled ))
    dispatch(setRouterStatisticUrl(router._id, router.hostname))
  }

  render() {
    let { router={}, vehicles=[], dfis=[], loading, i18n, user, statusOptions,
      companyOptions, profileOptions, typeOptions, statistic } = this.props
    let { vehicle_id, dfi_id, type, status, profile, transport_company,
      installed_at } = this.state

    return loading ? <CircularProgress /> : <Card>
      <CardMedia>
        { statistic ? <img style={{ maxWidth: 600, minWidth: 100 }} src={ statistic.url } /> : null }
      </CardMedia>
      <CardText>
        <form onSubmit={ this.mutate.bind(this) }>

          <Row>
            <Col xs="12" sm="6" md="6" lg="6">
              <BoxRow>

                <TextField
                defaultValue={ router.hostname || '' }
                type="text"
                ref="hostname"
                required={ true }
                floatingLabelText={ i18n.label.hostname }  />
                <br />

                <SelectField
                floatingLabelText={ i18n.label.vehicle_id }
                value={ vehicle_id }
                required={ true }
                onChange={ this.updateSelectField.bind(this, 'vehicle_id') }>
                  { [ { _id: null, number: i18n.option.none } ].concat(vehicles).map((vehicleItem) => {
                    return <MenuItem
                      key={ vehicleItem._id }
                      value={ vehicleItem._id }
                      primaryText={ vehicleItem.number } />
                  }) }
                 </SelectField>
                 { vehicle_id ? <Link to={ `/vehicle/${ vehicle_id }/edit` }><p>{ i18n.button.show_vehicle }</p></Link> : <br /> }

                <SelectField
                floatingLabelText={ i18n.label.dfi_id }
                value={ dfi_id }
                required={ true }
                onChange={ this.updateSelectField.bind(this, 'dfi_id') }>
                  { [ { _id: null, description: i18n.option.none } ].concat(dfis).map((dfi) => {
                    return <MenuItem
                      key={ dfi._id }
                      value={ dfi._id }
                      primaryText={ dfi.description } />
                  }) }
                </SelectField>
                { dfi_id ? <Link to={ `/dfi/${ dfi_id }/edit` }><p>{ i18n.button.show_dfi }</p></Link> : <br /> }

                <TextField
                defaultValue={ router.version || '' }
                type="text"
                ref="version"
                floatingLabelText={ i18n.label.version }  />
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

                <TextField
                defaultValue={ router.serial_number  || ''}
                type="text"
                ref="serial_number"
                required={ true }
                floatingLabelText={ i18n.label.serial_number }  />
                <br />

                <TextField
                defaultValue={ router.spos_id || '' }
                type="text"
                ref="spos_id"
                floatingLabelText={ i18n.label.spos_id }  />
                <br />

                <SelectField
                floatingLabelText={ i18n.label.status }
                value={ status }
                required={ true }
                onChange={ this.updateSelectField.bind(this, 'status') }>
                  { statusOptions.map((option) => {
                    return <MenuItem
                      key={ option }
                      value={ option }
                      primaryText={ i18n.option[option] } />
                  })}
                </SelectField>
                <br />

                <TextField
                defaultValue={ router.ip_router || '' }
                type="text"
                ref="ip_router"
                floatingLabelText={ i18n.label.ip_router }  />
                <br />

                <TextField
                defaultValue={ router.ip_cashbox || '' }
                type="text"
                ref="ip_cashbox"
                floatingLabelText={ i18n.label.ip_cashbox }  />
                <br />

              </BoxRow>
            </Col>
            <Col xs="12" sm="6" md="6" lg="6">
              <BoxRow>

                <TextField
                defaultValue={ router.sim1 || '' }
                type="number"
                ref="sim1"
                floatingLabelText={ i18n.label.sim1 }  />
                <br />

                <TextField
                defaultValue={ router.sim2 || '' }
                type="number"
                ref="sim2"
                floatingLabelText={ i18n.label.sim2 }  />
                <br />

                <TextField
                defaultValue={ router.sim_itt || '' }
                type="number"
                ref="sim_itt"
                required={ true }
                floatingLabelText={ i18n.label.sim_itt }  />
                <br />

                <TextField
                defaultValue={ router.phone1 || '' }
                type="number"
                ref="phone1"
                floatingLabelText={ i18n.label.phone1 }  />
                <br />

                <TextField
                defaultValue={ router.phone2 || '' }
                type="number"
                ref="phone2"
                floatingLabelText={ i18n.label.phone2 }  />
                <br />

                <TextField
                defaultValue={ router.phone_itt || '' }
                type="number"
                ref="phone_itt"
                floatingLabelText={ i18n.label.phone_itt }  />
                <br />

                <SelectField
                floatingLabelText={ i18n.label.profile }
                value={ profile }
                required={ true }
                onChange={ this.updateSelectField.bind(this, 'profile') }>
                  { profileOptions.map((option) => {
                    return <MenuItem
                      key={ option }
                      value={ option }
                      primaryText={ option } />
                  })}
                </SelectField>
                <br />

                <TextField
                defaultValue={ router.notes || '' }
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
                  { companyOptions.map((option) => {
                    return <MenuItem
                      key={ option }
                      value={ option }
                      primaryText={ option } />
                  })}
                </SelectField>
                <br />

                <DatePicker
                value={ installed_at }
                floatingLabelText={ i18n.label.installed_at || null }
                onChange={ this.updateSelectField.bind(this, 'installed_at') }
                hintText={ i18n.label.installed_at } />
                <br />

              </BoxRow>
            </Col>
          </Row>

          { isAllowed('routers.update', user ? user.roles : null) ?
          <RaisedButton
          type="submit"
          style={{ marginRight: 10 }}
          label={ i18n.button.update }
          primary={ true } />
          : null }

          { isAllowed('routers.remove', user ? user.roles : null) ?
          <RaisedButton
          onTouchTap={ this.toggleDialog.bind(this, 'openRemoveDialog') }
          label={ i18n.button.remove }
          secondary={ true } />
          : null }

          <Dialog
          title={ `${i18n.vocabulary.router} ${ router.hostname } ${i18n.button.remove}` }
          actions={ [
            <FlatButton
            label={ i18n.button.cancel }
            primary={ true }
            onTouchTap={ this.toggleDialog.bind(this, 'openRemoveDialog') }
            />,
            <FlatButton
            onTouchTap={ this.remove.bind(this) }
            label={ i18n.button.remove }
            secondary={ true } />,
          ] }
          modal={ false }
          onRequestClose={ this.toggleDialog.bind(this, 'openRemoveDialog') }
          open={ this.state.openRemoveDialog }>
            { i18n.question.confirm_delete_router }
          </Dialog>

        </form>

        <br />
        <List>
          <Subheader>{ i18n.label.history }</Subheader>
          { (router.history && router.history.length != 0) ?
          router.history.sort((a, b) => {
            return b.position - a.position
          }).map((version) => {
            return <ListItem
              key={ version._id }
              leftIcon={ <ActionHistory /> }
              primaryText={ formatDate(i18n.locale, version.object.updated_at || version.object.created_at) }
              containerElement={ <Link to={ `/router/${router._id}/version/${version._id}` } /> }
              secondaryText={ `${ i18n.label.created_by }: ${ version.object.updated_by || version.object.created_by }` } />
          }) : <ListItem
            primaryText={ i18n.hint.no_history } /> }
        </List>

        <br />
        <small>{ `${ i18n.label.updated_at }: ${ router.updated_at ? formatDate(i18n.locale, router.updated_at) : '-' }` }</small><br />
        <small>{ `${ i18n.label.updated_by }: ${ router.updated_by ? router.updated_by : '-' }` }</small><br />
        <small>{ `${ i18n.label.created_at }: ${ router.created_at ? formatDate(i18n.locale, router.created_at) : '-' }` }</small><br />
        <small>{ `${ i18n.label.created_by }: ${ router.created_by ? router.created_by : '-' }` }</small>

      </CardText>
    </Card>
  }
}

export default Router
