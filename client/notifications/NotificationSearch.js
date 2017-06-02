import React from 'react'
import { Card, CardText, TextField, RaisedButton } from 'material-ui'
import { NotificationList } from './index'
import { connect } from 'react-redux'
import { setNotificationFilter, setListLimit, increaseListLimit,
  resetListLimit, exportNotifications } from '../actions'
import { debounce } from 'lodash'
import { isAllowed } from '/imports/helpers'
import { NavigationExpandMore, FileFileDownload } from 'material-ui/svg-icons'

class NotificationSearch extends React.Component {

  constructor(props){
    super(props)
    this.updateFilter = debounce(this.updateFilter, 500)
  }

  componentDidMount(){
    let { dispatch } = this.props
    dispatch(resetListLimit())
  }

  updateFilter(){
    let { dispatch } = this.props
    let { filter } = this.refs
    dispatch(setNotificationFilter(filter.getValue()))
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
    dispatch(exportNotifications())
  }

  render() {
    let { i18n, limit, user, filter } = this.props

    return <Card>
      <CardText>

        <TextField
        defaultValue={ filter }
        style={{ float: 'right' }}
        floatingLabelText={ i18n.button.search }
        ref="filter"
        onChange={ this.updateFilter.bind(this) } />

        <br /><br /><br /><br />

        <NotificationList />

        { limit != 'all' ? <RaisedButton
        onTouchTap={ this.increaseLimit.bind(this) }
        label={ i18n.button.load_more }
        icon={ <NavigationExpandMore /> }
        primary={ true } /> : null }
        { limit != 'all' ? <p onTouchTap={ this.setLimit.bind(this, 'all') }>{ i18n.button.show_all }</p> : null }

        { isAllowed('vehicles.export', user ? user.roles : null) ?
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
    filter: state.notificationFilter,
  }
}
export default connect(mapStateToProps)(NotificationSearch)
