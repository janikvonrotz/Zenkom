import React from 'react'
import { List, ListItem, CircularProgress } from 'material-ui'
import { Link } from 'react-router'
import { HardwareRouter, MapsDirectionsBus } from 'material-ui/svg-icons'
import { fromNow } from '/imports/helpers'

class PostList extends React.Component {

  shouldComponentUpdate(nextProps){
    return !nextProps.loading
  }

  render() {
    let { notifications, loading, i18n } = this.props

    return loading ? <CircularProgress /> : <List>
      { notifications.map((notification) => {
        let icon = [ 'vehicle_inserted', 'vehicle_upgrade' ].indexOf(notification.type) != -1 ?
        <MapsDirectionsBus /> : <HardwareRouter />

        return <ListItem
          key={ notification._id }
          primaryText={ notification.subject }
          leftIcon={ icon }
          containerElement={ <Link to={ notification.link } /> }
          secondaryText={ <p>
              { notification.content }<br />
              { fromNow(i18n.locale, notification.created_at) }
            </p> }
          secondaryTextLines={2} />
      }) }
    </List>
  }
}

export default PostList
