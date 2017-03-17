import React from 'react'
import { CircularProgress } from 'material-ui'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
  TableRowColumn, TableFooter } from '../datatable'
import { Link } from 'react-router'
import { setHeaderTitle } from '../actions'

class RouterList extends React.Component {

  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.vocabulary.routers))
  }

  render() {
    let { routers, loading, i18n } = this.props

    let headers = [
      i18n.label.id,
      i18n.label.hostname,
      i18n.label.vehicle_number,
      i18n.label.dfi_name,
      i18n.label.router_version,
      i18n.label.type,
      i18n.label.ip_router,
      i18n.label.ip_cashbox,
    ]

    return loading ? <CircularProgress /> : <Table>
      <TableHeader>
        <TableRow>
          { headers.map((header) => {
            return <TableHeaderColumn key={ header }>{ header }</TableHeaderColumn>
          }) }
        </TableRow>
      </TableHeader>
      <TableBody>
        { routers.map((router) => {
          return <TableRow key={ router._id }>
            <TableRowColumn>{ router._id }</TableRowColumn>
            <TableRowColumn><Link
              to={ `/router/${router._id}/edit` }>
              { router.hostname }
            </Link></TableRowColumn>
            <TableRowColumn>{ router.vehicle.number }</TableRowColumn>
            <TableRowColumn>{ router.dfi_name }</TableRowColumn>
            <TableRowColumn>{ router.router_version }</TableRowColumn>
            <TableRowColumn>{ router.type }</TableRowColumn>
            <TableRowColumn>{ router.ip_router }</TableRowColumn>
            <TableRowColumn>{ router.ip_cashbox }</TableRowColumn>
          </TableRow>
        }) }
      </TableBody>
      <TableFooter>
        <TableRow>
          { headers.map((header) => {
            return <TableHeaderColumn key={ header }>{ header }</TableHeaderColumn>
          }) }
        </TableRow>
      </TableFooter>
    </Table>
  }
}

export default RouterList
