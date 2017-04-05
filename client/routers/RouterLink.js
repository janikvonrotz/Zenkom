import React from 'react'
import { RaisedButton, CardTitle, CardText } from 'material-ui'
import { Link } from 'react-router'
import { isAllowed } from '/imports/helpers'

class RouterLink extends React.Component {

  render() {
    let { router, i18n, dfiId, vehicleId, user } = this.props

    return isAllowed('routers.read', user ? user.roles : null) ?
    <div>
      <CardTitle style={{ paddingBottom: 0 }} title={ i18n.vocabulary.router } />
      <CardText style={{ paddingTop: 0 }}>
        { router ? <div>
          { dfiId ? <p>{ i18n.hint.router_linked_with_dfi.replace('{ hostname }', router.hostname) }</p> : null }
          { vehicleId ? <p>{ i18n.hint.router_linked_with_vehicle.replace('{ hostname }', router.hostname) }</p> : null }
          <Link to={ `/router/${ router._id }/edit` }>
            <RaisedButton
            label={ i18n.button.show_router }
            primary={ true } />
          </Link>
        </div> : <div>
        { dfiId ? <p>{ i18n.error.no_router_linked_with_dfi }</p>: null }
        { vehicleId ? <p>{ i18n.error.no_router_linked_with_vehicle }</p> : null }
          <Link to={ `/router/new?${ dfiId ? 'dfiId' : vehicleId ? 'vehicleId' : null }=${ dfiId || vehicleId }` }>
            <RaisedButton
            label={ i18n.button.add_router }
            primary={ true } />
          </Link>
        </div> }
      </CardText>
    </div>
    : <div />
  }
}

export default RouterLink
