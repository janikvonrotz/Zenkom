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
    let { routers, loading, i18n, headers = [
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
    ] } = this.props

    const tableRowContent = {
      hostname: (router) => {
        return <Link to={ `/router/${ router._id }/edit` }>{ router.hostname }</Link>
      },
      vehicle_number: (router) => {
        return router.vehicle ? <Link to={ `/vehicle/${ router.vehicle_id }/edit` }>{ router.vehicle.number }</Link> : null
      },
      dfi_description: (router) => {
        return router.dfi ? <Link to={ `/dfi/${ router.dfi_id }/edit` }>{ router.dfi.description }</Link> : null
      },
      status: (router) => {
        return i18n.option[router.status]
      },
      version: (router) => {
        return router.version
      },
      type: (router) => {
        return router.type
      },
      serial_number: (router) => {
        return router.serial_number
      },
      ip_router: (router) => {
        return router.ip_router
      },
      ip_cashbox: (router) => {
        return router.ip_cashbox
      },
      sim1: (router) => {
        return router.sim1
      },
      sim2: (router) => {
        return router.sim2
      },
      sim_itt: (router) => {
        return router.sim_itt
      },
    }

    return <div>
      { loading ? <CircularProgress /> : <div style={{ width: 40, height: 40 }} /> }
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
              { headers.map((header) => {
                return <TableRowColumn key={ `${ router._id }_${ header }` }>{ tableRowContent[header](router) }</TableRowColumn>
              }) }
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
