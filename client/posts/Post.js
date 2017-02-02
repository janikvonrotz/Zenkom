import React from 'react';
import { Card, CardText, CardTitle, CircularProgress, TextField,RaisedButton } from 'material-ui'
import { Link } from 'react-router'
import { setHeaderTitle, updatePost } from '../actions'

class Post extends React.Component {

  mutate(event) {
    event.preventDefault()

    let { post, dispatch } = this.props
    let { title } = this.refs
    post.title = title.getValue()

    updatePost(post, dispatch)
  }

  componentWillReceiveProps(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Post'))
  }

  render() {
    let { post, loading } = this.props
    return loading ? <CircularProgress /> : <Card>
      <CardTitle title="Post" subtitle="Card subtitle" />
      <CardText>
        <form onSubmit={ this.mutate.bind(this) }>
          <TextField
          defaultValue={ post.title }
          ref="title"
          floatingLabelText="Title" />
          <br />

          <RaisedButton
          label="Save"
          type="submit"
          primary={ true } />
        </form>
      </CardText>
    </Card>
  }
}

export default Post
