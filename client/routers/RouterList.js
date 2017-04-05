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
      'hostname',
      'vehicle_number',
      'dfi_description',
      'status',
      'type',
      'ip_router',
      'ip_cashbox',
      'sim1',
      'sim2',
      'sim_itt',
    ]

    return <div>
      { loading ? <CircularProgress /> : null }
      <Table>
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
              <TableRowColumn><Link
                to={ `/router/${router._id}/edit` }>
                { router.hostname }
              </Link></TableRowColumn>
              <TableRowColumn>{ router.vehicle ? router.vehicle.number : null }</TableRowColumn>
              <TableRowColumn>{ router.dfi ? router.dfi.description : null }</TableRowColumn>
              <TableRowColumn>{ i18n.option[router.status] }</TableRowColumn>
              <TableRowColumn>{ router.type }</TableRowColumn>
              <TableRowColumn>{ router.ip_router }</TableRowColumn>
              <TableRowColumn>{ router.ip_cashbox }</TableRowColumn>
              <TableRowColumn>{ router.sim1 }</TableRowColumn>
              <TableRowColumn>{ router.sim2 }</TableRowColumn>
              <TableRowColumn>{ router.sim_itt }</TableRowColumn>
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
    </div>
  }
}

export default RouterList
