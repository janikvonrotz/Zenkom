import React from 'react'
import { Card, CardText, TextField, RaisedButton } from 'material-ui'
import { UserList } from './index'
import { connect } from 'react-redux'
import { setUserFilter, resetListLimit, increaseListLimit, exportUsers,
  setListLimit } from '../actions'
import { debounce } from 'lodash'
import { isAllowed } from '/imports/helpers'
import { NavigationExpandMore, FileFileDownload } from 'material-ui/svg-icons'

class UserSearch extends React.Component {

  constructor(props){
    super(props)
    this.updateFilter = debounce(this.updateFilter, 500)
  }

  componentDidMount(){
    let { dispatch } = this.props
    dispatch(resetListLimit())
    dispatch(setUserFilter(''))
  }

  updateFilter(){
    let { dispatch } = this.props
    let { filter } = this.refs
    dispatch(setUserFilter(filter.getValue()))
  }

  increaseLimit(){
    let { dispatch } = this.props
    dispatch(increaseListLimit())
  }

  setLimit(limit){
    let { dispatch } = this.props
    dispatch(setListLimit(limit))
  }

  export(){
    let { dispatch } = this.props
    dispatch(exportUsers())
  }

  render() {
    let { i18n, limit, user } = this.props

    return <Card>
      <CardText>

        <TextField
        style={{ float: 'right' }}
        floatingLabelText={ i18n.button.search }
        ref="filter"
        onChange={this.updateFilter.bind(this)} />

        <br /><br />

        <UserList />

        { limit != 'all' ? <RaisedButton
        onTouchTap={ this.increaseLimit.bind(this) }
        label={ i18n.button.load_more }
        icon={ <NavigationExpandMore /> }
        primary={ true } /> : null }
        { limit != 'all' ? <p onTouchTap={ this.setLimit.bind(this, 'all') }>{ i18n.button.show_all }</p> : null }

        { isAllowed('users.export', user ? user.roles : null) ?
        <RaisedButton
        onTouchTap={ this.export.bind(this) }
        label={ i18n.button.download_csv }
        icon={ <FileFileDownload /> }
        secondary={ true } />
        : null }

      </CardText>
    </Card>
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    i18n: state.i18n,
    limit: state.listLimit,
  }
}
export default connect(mapStateToProps)(UserSearch)
