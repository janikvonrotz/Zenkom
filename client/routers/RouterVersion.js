import React from 'react'
import { Card, CardText, CircularProgress } from 'material-ui'
import { setHeaderTitle } from '../actions'

class RouterVersion extends React.Component {

  restore(){
    let { dispatch } = this.props
    dispatch()
  }

  componentWillReceiveProps(nextProps){
    let { dispatch, routerVersion, i18n } = nextProps
    dispatch(setHeaderTitle(routerVersion ? `${ i18n.vocabulary.router } ${ (routerVersion.object.updated_at || routerVersion.object.created_at).toISOString() }` : i18n.vocabulary.untitled ))
  }

  render() {
    let { routerVersion, loading } = this.props

    return loading ? <CircularProgress /> : <Card>
      <CardText>
        <p>Version</p>
        <code>
          { JSON.stringify(routerVersion.object) }
        </code>
      </CardText>
    </Card>
  }
}

export default RouterVersion
