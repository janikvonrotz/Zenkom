import React from 'react'
import { List, ListItem, CircularProgress, IconMenu, MenuItem,
  IconButton } from 'material-ui'
import { NavigationMoreVert } from 'material-ui/svg-icons'
import { grey400 } from 'material-ui/styles/colors'
import { Link } from 'react-router'
import { setHeaderTitle, removePost, setPostFilter } from '../actions'

class PostList extends React.Component {

  remove(id){
    let { dispatch } = this.props
    removePost(id, dispatch)
  }

  updateFilter(){
    let { dispatch } = this.props
    let { filter } = this.refs
    dispatch(setPostFilter(filter.getValue()))
  }

  componentWillReceiveProps(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Posts'))
  }

  render() {
    let { posts, loading } = this.props

    return loading ? <CircularProgress /> : <List>
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
  }
}

export default PostList
