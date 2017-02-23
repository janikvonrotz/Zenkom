import React from 'react'
import { Card, CardText, CircularProgress,
  TextField, RaisedButton, SelectField, MenuItem } from 'material-ui'
import { setHeaderTitle, updateRouter, insertRouter } from '../actions'

class Router extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      typeValue: 1,
    }
  }

  mutate(event) {
    event.preventDefault()

    let { router = {}, dispatch } = this.props
    let { vehicle_id, dfi_name, router_version } = this.refs
    router.vehicle_id = vehicle_id.getValue()
    router.dfi_name = dfi_name.getValue()
    router.router_version = router_version.getValue()
    router.type = this.state.typeValue

    router._id ? updateRouter(router, dispatch) : insertRouter(router, dispatch)
  }

  updateSelectField(event, index, value){
    this.setState({ typeValue: value })
  }

  componentWillReceiveProps(nextProps){
    let { dispatch, router } = nextProps
    this.setState({ typeValue: router && router.type ? router.type : null })
    dispatch(setHeaderTitle(router ? 'Router' : 'Untitled'))
  }

  render() {
    let { router, loading } = this.props

    if (!router) {
      router = {
        vehicle_id: '',
        dfi_name: '',
        router_version: '',
      }
    }

    return loading ? <CircularProgress /> : <Card>
      <CardText>
        <form onSubmit={ this.mutate.bind(this) }>

          <TextField
          defaultValue={ router.vehicle_id }
          type="text"
          ref="vehicle_id"
          floatingLabelText="Fahrzeugnummer" />
          <br />

          <TextField
          defaultValue={ router.dfi_name }
          type="number"
          ref="dfi_name"
          floatingLabelText="DFI Bezeichnung" />
          <br />

          <TextField
          defaultValue={ router.router_version }
          type="text"
          ref="router_version"
          floatingLabelText="Version" />
          <br />

          <SelectField
          floatingLabelText="Typ"
          value={ this.state.typeValue }
          required={ true }
          onChange={ this.updateSelectField.bind(this) }>
           <MenuItem value={ 'NB2541' } primaryText="NB2541" />
           <MenuItem value={ 'NB2542' } primaryText="NB2542" />
          </SelectField>
          <br />

          <RaisedButton
          label="Save"
          type="submit"
          primary={ true } />
        </form>
      </CardText>
    </Card>
  }
}

export default Router
