import React from 'react'
import { Card, CardText, CardTitle, FloatingActionButton,
  TextField } from 'material-ui'
import { ContentAdd } from 'material-ui/svg-icons'
import { PostList } from './index'
import { connect } from 'react-redux'
import { insertPost, setPostFilter } from '../actions'

class PostSearch extends React.Component {

  insert(event){
    insertPost()
  }

  updateFilter(event){
    let { dispatch } = this.props
    let { filter } = this.refs
    dispatch(setPostFilter(filter.getValue()))
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

        <PostList />

      </CardText>
    </Card>
  }
}

export default connect()(PostSearch)
