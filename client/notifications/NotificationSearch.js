import React from 'react'
import { Card, CardText, TextField, RaisedButton } from 'material-ui'
import { NotificationList } from './index'
import { connect } from 'react-redux'
import { setNotificationFilter, setListLimit } from '../actions'

class NotificationSearch extends React.Component {

  updateFilter(){
    let { dispatch } = this.props
    let { filter } = this.refs
    dispatch(setNotificationFilter(filter.getValue()))
  }

  updateLimit(limitValue){
    let { dispatch, limit } = this.props
    limit = limit != 'all' ? limitValue || (limit + 10) : limit
    dispatch(setListLimit(limit))
  }

  componentDidMount(){
    let { dispatch } = this.props
    dispatch(setListLimit(10))
    dispatch(setNotificationFilter(''))
  }

  render() {
    let { i18n } = this.props

    return <Card>
      <CardText>

        <TextField
        style={{ float: 'right' }}
        floatingLabelText={ i18n.button.search }
        ref="filter"
        onChange={ this.updateFilter.bind(this) } />

        <br /><br /><br /><br />

        <NotificationList />

        <RaisedButton
        onTouchTap={ this.updateLimit.bind(this, null) }
        label={ i18n.button.load_more }
        primary={ true } />
        <p onTouchTap={ this.updateLimit.bind(this, 'all') }>{ i18n.button.show_all }</p>

      </CardText>
    </Card>
  }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    limit: state.listLimit,
  }
}
export default connect(mapStateToProps)(NotificationSearch)
