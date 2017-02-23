import React from 'react'
import { Card, CardText, TextField, RaisedButton } from 'material-ui'
import { RouterList } from './index'
import { connect } from 'react-redux'
import { insertRouter, setRouterFilter } from '../actions'

class RouterSearch extends React.Component {

  insert(){
    insertRouter()
  }

  updateFilter(){
    let { dispatch } = this.props
    let { filter } = this.refs
    dispatch(setRouterFilter(filter.getValue()))
  }

  render() {
    return <Card>
      <CardText>

        <TextField
        style={{ float: 'right' }}
        floatingLabelText="Search"
        ref="filter"
        onChange={this.updateFilter.bind(this)} />

        <br /><br />

        <RaisedButton
        onTouchTap={ this.insert.bind(this) }
        label="Add Router"
        primary={true} />

        <br /><br />

        <RouterList />

      </CardText>
    </Card>
  }
}

export default connect()(RouterSearch)
