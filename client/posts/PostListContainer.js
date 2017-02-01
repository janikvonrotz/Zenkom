import PostList from './PostList'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Posts } from '/imports/collections'
import { Meteor } from 'meteor/meteor';

export default connect()(createContainer(() => {
  let subscription = Meteor.subscribe('posts.list')
  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    loading: !subscription.ready(),
  }
}, PostList))
