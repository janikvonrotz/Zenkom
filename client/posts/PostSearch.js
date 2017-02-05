
import React from 'react';
import { Card, CardText, CardTitle, FloatingActionButton,
  TextField } from 'material-ui'
import { ContentAdd } from 'material-ui/svg-icons'
import { PostList } from './index'
import { connect } from 'react-redux'
import { setHeaderTitle, removePost, insertPost, setPostFilter } from '../actions'

class PostSearch extends React.Component {

  insert(event){
    insertPost()
  }

  updateFilter(event){
    let { dispatch } = this.props
    let { filter } = this.refs
    dispatch(setPostFilter(filter.getValue()))
  }

  componentWillReceiveProps(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Posts'))
  }

  render() {
    return <Card>
      <CardTitle title="A list of posts"/>
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
