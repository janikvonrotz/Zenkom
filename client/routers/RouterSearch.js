import React from 'react'
import { Card, CardText, CardTitle, FloatingActionButton,
  TextField } from 'material-ui'
import { ContentAdd } from 'material-ui/svg-icons'
import { RouterList } from './index'
import { connect } from 'react-redux'
import { insertRouter, setRouterFilter } from '../actions'

class RouterSearch extends React.Component {

  insert(event){
    insertPost()
  }

  updateFilter(event){
    let { dispatch } = this.props
    let { filter } = this.refs
    dispatch(setRouterFilter(filter.getValue()))
  }

  render() {
    return <Card>
      <CardText>
        <FloatingActionButton
        mini={ true }
        onTouchTap={this.insert.bind(this)}>
          <ContentAdd />
        </FloatingActionButton>
        <br />

        <TextField
        floatingLabelText="Search"
        ref="filter"
        onChange={this.updateFilter.bind(this)} />

        <RouterList />

      </CardText>
    </Card>
  }
}

export default connect()(RouterSearch)
