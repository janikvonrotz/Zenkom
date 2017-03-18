import React from 'react'
import { CircularProgress } from 'material-ui'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
  TableRowColumn, TableFooter } from '../datatable'
import { setHeaderTitle, updateUserRole } from '../actions'

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

  update(field, id, event){
    let { dispatch } = this.props
    let role = event.target.value

    dispatch(updateUserRole(id, role))

    let state = {}
    state[field] = role
    this.setState(state)
  }

  render() {
    let { users, loading, i18n, roleOptions } = this.props
    let headers = [
      i18n.label.id,
      i18n.label.firstname,
      i18n.label.lastname,
      i18n.label.email,
      i18n.label.role,
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
            return <TableHeaderColumn key={ header }>{ header }</TableHeaderColumn>
          }) }
        </TableRow>
      </TableFooter>
    </Table>
  }
}

export default UserList
