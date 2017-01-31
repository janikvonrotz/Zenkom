import React from 'react';
import { createContainer } from 'meteor/react-meteor-data'
import { Posts } from '/imports/collections'
import { List, ListItem, Card, CardText, CardTitle,
  CircularProgress, IconMenu, MenuItem, IconButton } from 'material-ui'
import { NavigationMoreVert } from 'material-ui/svg-icons';
import { grey400 } from 'material-ui/styles/colors'
import { Link } from 'react-router'
import { posts } from '../actions'

class PostList extends React.Component {

  remove(id, event){
    posts.remove(id)
  }

  render() {
    let { posts, loading } = this.props

    return loading ? <CircularProgress /> : <Card>
      <CardTitle title="Card title" subtitle="Card subtitle" />
      <CardText>
        <List>
          { posts.map((post) => {
            return <ListItem
              key={ post._id }
              primaryText={ post.title }
              secondaryText={ post.createdAt.toISOString() }
              rightIconButton={ <IconMenu
                iconButtonElement={ <IconButton
                  touch={true}
                  tooltip="more"
                  tooltipPosition="bottom-left">
                    <NavigationMoreVert color={grey400} />
                  </IconButton>
                }>
                  <MenuItem
                  containerElement={ <Link to={`/post/${post._id}/edit`} /> }>
                  Edit</MenuItem>

                  <MenuItem
                  onTouchTap={ this.remove.bind(this, post._id) }>
                  Delete</MenuItem>

                </IconMenu>
              } />
          }) }
        </List>
      </CardText>
    </Card>
  }
}

export default createContainer(() => {
  let subscription = Meteor.subscribe('posts.list')
  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    loading: !subscription.ready(),
  }
}, PostList)
