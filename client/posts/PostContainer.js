import Post from './Post'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Posts } from '/imports/collections'
import { Meteor } from 'meteor/meteor'

export default connect()(createContainer(({ params }) => {
  let subscription = Meteor.subscribe('posts.item', params.id)
  return {
    post: Posts.findOne(params.id),
    loading: !subscription.ready(),
  }
}, Post))
