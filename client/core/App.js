import React from 'react'
import { Card, CardText } from 'material-ui'
import { setHeaderTitle, resetListLimit } from '../actions'
import { connect } from 'react-redux'
import { NotificationList } from '../notifications'
import { isAllowed } from '/imports/helpers'

class App extends React.Component {

  componentDidMount(){
    let { dispatch } = this.props
    dispatch(resetListLimit())
    this.componentWillReceiveProps()
  }

  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.button.dashboard))
  }

  render() {
    let { i18n, user } = this.props

    return <Card>
      <CardText>
        { user ? <p>{ `${ i18n.vocabulary.greeting } ${ user.profile.name }` }</p> : null }

        <p>{ i18n.text.introduction }</p>

        { !user ? <p>{ i18n.text.contact_administrator }</p> : null }

        { user && isAllowed('notifications.read', user.roles) ? <NotificationList />
         : <p>{ i18n.text.contact_administrator }</p> }

      </CardText>
    </Card>
  }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    user: state.user,
  }
}
export default connect(mapStateToProps)(App)
