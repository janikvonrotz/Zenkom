import React from 'react'
import { CircularProgress } from 'material-ui'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
  TableRowColumn, TableFooter } from '../datatable'
import { Link } from 'react-router'
import { setHeaderTitle, setListSort } from '../actions'

class RouterList extends React.Component {

  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.vocabulary.routers))
  }

  componentDidMount(){
    let { dispatch } = this.props
    dispatch(setListSort(null))
  }

  updateSort(sort) {
    let { dispatch } = this.props
    dispatch(setListSort(sort))
  }

  render() {
    let { routers, loading, i18n } = this.props

    let headers = [
      '_id',
      'hostname',
      'vehicle_number',
      'dfi_name',
      'version',
      'type',
      'ip_router',
      'ip_cashbox',
    ]

    return loading ? <CircularProgress /> : <Table>
      <TableHeader>
        <TableRow>
        { headers.map((header) => {
          return <TableHeaderColumn
          onClick={ this.updateSort.bind(this, header)}
          key={ header }>
            { i18n.label[header] }
          </TableHeaderColumn>
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
            <TableRowColumn>{ router.vehicle ? router.vehicle.number : i18n.error.number_removed }</TableRowColumn>
            <TableRowColumn>{ router.dfi_name }</TableRowColumn>
            <TableRowColumn>{ router.version }</TableRowColumn>
            <TableRowColumn>{ router.type }</TableRowColumn>
            <TableRowColumn>{ router.ip_router }</TableRowColumn>
            <TableRowColumn>{ router.ip_cashbox }</TableRowColumn>
          </TableRow>
        }) }
      </TableBody>
      <TableFooter>
        <TableRow>
        { headers.map((header) => {
          return <TableHeaderColumn
          onClick={ this.updateSort.bind(this, header)}
          key={ header }>
            { i18n.label[header] }
          </TableHeaderColumn>
        }) }
        </TableRow>
      </TableFooter>
    </Table>
  }
}

export default RouterList
