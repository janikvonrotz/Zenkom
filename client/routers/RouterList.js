import React from 'react';
import { Card, CardText, CircularProgress, Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui'
import { Link } from 'react-router'
import { setHeaderTitle } from '../actions'

class RouterList extends React.Component {

  componentWillReceiveProps(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Routers'))
  }

  render() {
    let { routers, loading } = this.props
    console.log(routers)

    return loading ? <CircularProgress /> : <Card>
      <CardText>
        <Table>
          <TableHeader
            displaySelectAll={ false }
            adjustForCheckbox={ false }>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Fahrzeugnummer</TableHeaderColumn>
              <TableHeaderColumn>DFI Bezeichnung</TableHeaderColumn>
              <TableHeaderColumn>Version</TableHeaderColumn>
              <TableHeaderColumn>Typ</TableHeaderColumn>
              <TableHeaderColumn>Seriennumer</TableHeaderColumn>
              <TableHeaderColumn>IP Router</TableHeaderColumn>
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
                <TableRowColumn>{ router.ip_router }</TableRowColumn>
              </TableRow>
            }) }
          </TableBody>
        </Table>
      </CardText>
    </Card>
  }
}

export default RouterList
