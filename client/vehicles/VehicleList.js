import React from 'react'
import { CircularProgress } from 'material-ui'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
  TableRowColumn, TableFooter } from '../datatable'
import { Link } from 'react-router'
import { setHeaderTitle } from '../actions'

class VehicleList extends React.Component {

  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.vocabulary.vehicles))
  }

  render() {
    let { vehicles, loading, i18n } = this.props

    let headers = [
      i18n.label.id,
      i18n.label.number,
      i18n.label.status,
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
        { vehicles.map((vehicle) => {
          return <TableRow key={ vehicle._id }>
            <TableRowColumn>{ vehicle._id }</TableRowColumn>
            <TableRowColumn><Link to={ `/vehicle/${vehicle._id}/edit` }>
              { vehicle.number }
            </Link></TableRowColumn>
            <TableRowColumn>{ i18n.option[vehicle.status] }</TableRowColumn>
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

export default VehicleList
