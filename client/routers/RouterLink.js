import React from 'react'
import { RaisedButton, CardTitle, CardText } from 'material-ui'
import { Link } from 'react-router'

class RouterLink extends React.Component {

  render() {
    let { router, i18n, dfiId, vehicleId } = this.props

    return <div>
      <CardTitle title={ i18n.vocabulary.router } />
      <CardText>
        { router ? <div>
          { dfiId ? <p>Der Router { router.hostname } wurde mit diesem DFI verlinkt.</p> : null }
          { vehicleId ? <p>Der Router { router.hostname } wurde mit diesem Fahrzeug verlinkt.</p> : null }
          <Link to={ `/router/${ router._id }/edit` }>
            <RaisedButton
            label={ i18n.button.show_router }
            primary={ true } />
          </Link>
        </div> : <div>
        { dfiId ? <p>Es wurde noch kein Router mit diesem DFI verlinkt.</p>: null }
        { vehicleId ? <p>Es wurde noch kein Router mit diesem Fahrzeug verlinkt.</p> : null }
          <Link to={ `/router/new?${ dfiId ? 'dfiId' : vehicleId ? 'vehicleId' : null }=${ dfiId || vehicleId }` }>
            <RaisedButton
            label={ i18n.button.add_router }
            primary={ true } />
          </Link>
        </div> }
      </CardText>
    </div>
  }
}

export default RouterLink
