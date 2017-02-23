import PostList from './PostList'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Posts } from '/imports/collections'
import { Meteor } from 'meteor/meteor'

const mapStateToProps = (state) => {
  return {
    filter: state.postFilter,
  }
}
export default connect(mapStateToProps)(createContainer(({ filter }) => {
  let subscription = Meteor.subscribe('posts.list', filter)
  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    loading: !subscription.ready(),
  }
}, PostList))
