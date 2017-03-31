import React from 'react'
import { CircularProgress } from 'material-ui'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
  TableRowColumn, TableFooter } from '../datatable'
import { Link } from 'react-router'
import { setHeaderTitle, setListSort } from '../actions'

class VehicleList extends React.Component {

  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.vocabulary.vehicles))
  }

  shouldComponentUpdate(nextProps){
    return !nextProps.loading
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
    let { vehicles, loading, i18n } = this.props

    let headers = [
      '_id',
      'number',
      'status'
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

export default VehicleList
