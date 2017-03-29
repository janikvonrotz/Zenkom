import React from 'react'
import { CircularProgress } from 'material-ui'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
  TableRowColumn, TableFooter } from '../datatable'
import { Link } from 'react-router'
import { setHeaderTitle, setListSort } from '../actions'

class DfiList extends React.Component {

  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.vocabulary.dfis))
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
    let { dfis, loading, i18n } = this.props

    let headers = [
      '_id',
      'description',
      'type',
      'row_type',
      'location',
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
          { dfis.map((dfi) => {
            return <TableRow key={ dfi._id }>
              <TableRowColumn>{ dfi._id }</TableRowColumn>
              <TableRowColumn><Link to={ `/dfi/${dfi._id}/edit` }>
                { dfi.description }
              </Link></TableRowColumn>
              <TableRowColumn>{ dfi.type }</TableRowColumn>
              <TableRowColumn>{ dfi.row_type }</TableRowColumn>
              <TableRowColumn>{ dfi.location }</TableRowColumn>
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

export default DfiList
