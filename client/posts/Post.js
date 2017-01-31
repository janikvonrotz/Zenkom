import React from 'react';
import { createContainer } from 'meteor/react-meteor-data'
import { Posts } from '/imports/collections'
import { Card, CardText, CardTitle, CircularProgress, TextField,RaisedButton } from 'material-ui'
import { Link } from 'react-router'
import { posts } from '../actions'

class Post extends React.Component {

  mutate(event) {
    event.preventDefault()

    let { post } = this.props
    let { title } = this.refs
    post.title = title.getValue()

    posts.update(post)
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

export default createContainer(({ params }) => {
  let subscription = Meteor.subscribe('posts.item', params.id)
  return {
    post: Posts.findOne(params.id),
    loading: !subscription.ready(),
  }
}, Post)
