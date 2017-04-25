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
        return <Link to={ `/router/${router._id}/edit` }>{ router.hostname }</Link>
      },
      vehicle_number: (router) => {
        return router.vehicle ? router.vehicle.number : null
      },
      dfi_description: (router) => {
        return router.dfi ? router.dfi.description : null
      },
      status: (router) => {
        return i18n.option[router.status]
      },
      type: (router) => {
        return router.type
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
