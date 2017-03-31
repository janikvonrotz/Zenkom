import React from 'react'
import { CircularProgress } from 'material-ui'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
  TableRowColumn, TableFooter } from '../datatable'
import { setHeaderTitle, updateUserRole, setListSort } from '../actions'

class UserList extends React.Component {

  componentWillReceiveProps(nextProps){
    let { dispatch, i18n, users } = nextProps
    let state = {}
    users.map((user) => {
      state[`role.${user._id}`] = user.roles ? user.roles[0] : ''
      this.setState(state)
    })
    dispatch(setHeaderTitle(i18n.vocabulary.users))
  }

  shouldComponentUpdate(nextProps){
    return !nextProps.loading
  }

  update(field, id, event){
    let { dispatch } = this.props
    let role = event.target.value

    dispatch(updateUserRole(id, role))

    let state = {}
    state[field] = role
    this.setState(state)
  }

  updateSort(sort) {
    let { dispatch } = this.props
    dispatch(setListSort(sort))
  }

  render() {
    let { users, loading, i18n, roleOptions } = this.props
    let headers = [
      '_id',
      'firstname',
      'lastname',
      'email',
      'role',
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
          { users.map((user) => {
            return <TableRow key={ user._id }>
              <TableRowColumn>{ user._id }</TableRowColumn>
              <TableRowColumn>{ user.profile.firstname }</TableRowColumn>
              <TableRowColumn>{ user.profile.lastname }</TableRowColumn>
              <TableRowColumn>{ user.emails[0].address }</TableRowColumn>
              <TableRowColumn><select
                value={ this.state[`role.${user._id}`] || '' }
                onChange={ this.update.bind(this, `role.${user._id}` || '', user._id) }>
                { roleOptions.map((option) => {
                  return <option
                    key={ option }
                    value={ option }>
                      { i18n.role[option] }
                    </option>
                }) }</select></TableRowColumn>
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

export default UserList
