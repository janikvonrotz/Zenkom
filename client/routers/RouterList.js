import React from 'react'
import { CircularProgress, Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui'
import { Link } from 'react-router'
import { setHeaderTitle } from '../actions'

class RouterList extends React.Component {

  componentWillReceiveProps(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Routers'))
  }

  render() {
    let { routers, loading, i18n } = this.props
    console.info(routers)

    return loading ? <CircularProgress /> : <Table style={{ width: '1000px' }}>
      <TableHeader
        displaySelectAll={ false }
        adjustForCheckbox={ false }>
        <TableRow>
          <TableHeaderColumn>{ i18n.label.id }</TableHeaderColumn>
          <TableHeaderColumn>{ i18n.label.vehicle_id }</TableHeaderColumn>
          <TableHeaderColumn>{ i18n.label.dfi_name }</TableHeaderColumn>
          <TableHeaderColumn>{ i18n.label.router_version }</TableHeaderColumn>
          <TableHeaderColumn>{ i18n.label.type }</TableHeaderColumn>
          <TableHeaderColumn>{ i18n.label.serial_number }</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={ false }>
        { routers.map((router) => {
          return <TableRow key={ router._id }>
            <TableRowColumn>{ router._id }</TableRowColumn>
            <TableRowColumn>{ router.vehicle_id ?
              <Link to={ `/router/${router._id}/edit` }>
                { router.vehicle_id }
              </Link> : null }
            </TableRowColumn>
            <TableRowColumn>{ router.dfi_name ?
              <Link to={ `/router/${router._id}/edit` }>
                { router.dfi_name }
              </Link> : null }
            </TableRowColumn>
            <TableRowColumn>{ router.router_version }</TableRowColumn>
            <TableRowColumn>{ router.type }</TableRowColumn>
            <TableRowColumn>{ router.serial_number }</TableRowColumn>
          </TableRow>
        }) }
      </TableBody>
    </Table>
  }
}

export default RouterList

// <TableHeaderColumn>{ i18n.label.spos_id }</TableHeaderColumn>
// <TableHeaderColumn>{ i18n.label.status }</TableHeaderColumn>
// <TableHeaderColumn>{ i18n.label.ip_router }</TableHeaderColumn>
// <TableHeaderColumn>{ i18n.label.ip_cashbox }</TableHeaderColumn>
// <TableHeaderColumn>{ i18n.label.sim1 }</TableHeaderColumn>
// <TableHeaderColumn>{ i18n.label.sim2 }</TableHeaderColumn>
// <TableHeaderColumn>{ i18n.label.sim_itt }</TableHeaderColumn>
// <TableHeaderColumn>{ i18n.label.phone1 }</TableHeaderColumn>
// <TableHeaderColumn>{ i18n.label.phone2 }</TableHeaderColumn>
// <TableHeaderColumn>{ i18n.label.phone_itt }</TableHeaderColumn>
// <TableHeaderColumn>{ i18n.label.profile }</TableHeaderColumn>
// <TableHeaderColumn>{ i18n.label.notes }</TableHeaderColumn>
// <TableHeaderColumn>{ i18n.label.transport_company }</TableHeaderColumn>
// <TableHeaderColumn>{ i18n.label.installed_at }</TableHeaderColumn>
// <TableHeaderColumn>{ i18n.label.created_at }</TableHeaderColumn>
// <TableHeaderColumn>{ i18n.label.updated_at }</TableHeaderColumn>

// <TableRowColumn>{ router.spos_id }</TableRowColumn>
// <TableRowColumn>{ router.status }</TableRowColumn>
// <TableRowColumn>{ router.ip_router }</TableRowColumn>
// <TableRowColumn>{ router.ip_cashbox }</TableRowColumn>
// <TableRowColumn>{ router.sim1 }</TableRowColumn>
// <TableRowColumn>{ router.sim2 }</TableRowColumn>
// <TableRowColumn>{ router.sim_itt }</TableRowColumn>
// <TableRowColumn>{ router.phone1 }</TableRowColumn>
// <TableRowColumn>{ router.phoone2 }</TableRowColumn>
// <TableRowColumn>{ router.phone_itt }</TableRowColumn>
// <TableRowColumn>{ router.profile }</TableRowColumn>
// <TableRowColumn>{ router.notes }</TableRowColumn>
// <TableRowColumn>{ router.transport_company }</TableRowColumn>
// <TableRowColumn>{ router.installed_at }</TableRowColumn>
// <TableRowColumn>{ router.created_at }</TableRowColumn>
// <TableRowColumn>{ router.updated_at }</TableRowColumn>
