import React from 'react';
import { Card, CardText, CardTitle, CircularProgress,
  TextField,RaisedButton } from 'material-ui'
import { Link } from 'react-router'
import { setHeaderTitle, updatePost, insertPost } from '../actions'

class Post extends React.Component {

  mutate(event) {
    event.preventDefault()

    let { post = {}, dispatch } = this.props
    let { title, content } = this.refs
    post.title = title.getValue()
    post.content = content.getValue()

    post._id ? updatePost(post, dispatch) : insertPost(post, dispatch)
  }

  componentWillReceiveProps(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Post'))
  }

  render() {
    let { post, loading } = this.props
    if (!post) {
      post = {
        title: "",
        content: ""
      }
    }

    return loading ? <CircularProgress /> : <Card>
      <CardTitle title={ post.title || "Untitled"} />
      <CardText>
        <form onSubmit={ this.mutate.bind(this) }>
          <TextField
          defaultValue={ post.title }
          ref="title"
          floatingLabelText="Title" />
          <br />

          <TextField
          defaultValue={ post.content }
          ref="content"
          multiLine={ true }
          floatingLabelText="Content" />
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
