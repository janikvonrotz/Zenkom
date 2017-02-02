import React from 'react';
import { List, ListItem, Card, CardText, CardTitle,
  CircularProgress, IconMenu, MenuItem, IconButton } from 'material-ui'
import { NavigationMoreVert } from 'material-ui/svg-icons';
import { grey400 } from 'material-ui/styles/colors'
import { Link } from 'react-router'
import { setHeaderTitle, updatePost } from '../actions'

class PostList extends React.Component {

  remove(id, event){
    let { dispatch } = this.props
    dispatch(updatePost(id))
  }

  componentWillReceiveProps(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Posts'))
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

export default PostList
