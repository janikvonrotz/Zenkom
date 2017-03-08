import React from 'react'
import { List, ListItem, CircularProgress } from 'material-ui'
import { setHeaderTitle } from '../actions'

class PostList extends React.Component {

  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.vocabulary.notifications))
  }

  render() {
    let { notifications, loading } = this.props

    return loading ? <CircularProgress /> : <List>
      { notifications.map((notification) => {
        return <ListItem
          key={ notification._id }
          primaryText={ notification.subject }
          secondaryTextLines={ 2 }
          secondaryText={ notification.content } />
      }) }
    </List>
  }
}

export default PostList
