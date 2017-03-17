import React from 'react'
import { Card, CardText, TextField } from 'material-ui'
import { NotificationList } from './index'
import { connect } from 'react-redux'
import { setNotificationFilter } from '../actions'

class NotificationSearch extends React.Component {

  updateFilter(){
    let { dispatch } = this.props
    let { filter } = this.refs
    dispatch(setNotificationFilter(filter.getValue()))
  }

  render() {
    let { i18n } = this.props

    return <Card>
      <CardText>

        <TextField
        style={{ float: 'right' }}
        floatingLabelText={ i18n.button.search }
        ref="filter"
        onChange={this.updateFilter.bind(this)} />

        <br /><br /><br /><br />

        <NotificationList />

      </CardText>
    </Card>
  }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
  }
}
export default connect(mapStateToProps)(NotificationSearch)
