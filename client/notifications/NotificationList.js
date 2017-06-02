import React from 'react'
import { List, ListItem, CircularProgress } from 'material-ui'
import { Link } from 'react-router'
import { HardwareRouter, MapsDirectionsBus,
  HardwareDeveloperBoard } from 'material-ui/svg-icons'
import { fromNow } from '/imports/helpers'
import { setHeaderTitle } from '../actions'

class PostList extends React.Component {

  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.vocabulary.notifications))
  }

  render() {
    let { notifications, loading, i18n } = this.props

    return <div>
      { loading ? <CircularProgress /> : <div style={{ width: 40, height: 40 }} /> }
      { notifications.length != 0 ?
      <List>
        { notifications.map((notification) => {
          let icon = [ 'vehicle_inserted', 'vehicle_upgrade' ].indexOf(notification.type) != -1 ?
          <MapsDirectionsBus /> : [ 'dfi_inserted' ].indexOf(notification.type) != -1 ?
          <HardwareDeveloperBoard /> : <HardwareRouter />

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
      </List> : <p>
        { i18n.text.check_out_settings }<Link to={ '/settings' }>{ i18n.vocabulary.settings }</Link>{ '.' }
      </p> }
    </div>
  }
}

export default PostList
