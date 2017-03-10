import React from 'react'
import { Card, CardText, CircularProgress, RaisedButton, Dialog,
  FlatButton, } from 'material-ui'
import { setHeaderTitle, restoreRouter } from '../actions'

class RouterVersion extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      openRestoreDialog: false,
    }
  }

  restore(){
    let { dispatch, router, routerVersion } = this.props
    dispatch(restoreRouter(router._id, routerVersion._id))
  }

  toggleDialog(field){
    let state = {}
    state[field] = !this.state[field]
    this.setState(state)
  }

  componentWillReceiveProps(nextProps){
    let { dispatch, routerVersion, i18n } = nextProps
    dispatch(setHeaderTitle(routerVersion ? `${ i18n.vocabulary.router } ${ (routerVersion.object.updated_at || routerVersion.object.created_at).toISOString() }` : i18n.vocabulary.untitled ))
  }

  render() {
    let { routerVersion, loading, i18n } = this.props

    const actions = [
      <FlatButton
      label={ i18n.button.cancel }
      primary={ true }
      onTouchTap={ this.toggleDialog.bind(this, 'openRestoreDialog') }
      />,
      <FlatButton
      onTouchTap={ this.restore.bind(this) }
      label={ i18n.button.restore }
      secondary={ true } />,
    ]

    return loading ? <CircularProgress /> : <Card>
      <CardText>

        { Object.keys(routerVersion.object).map((label) => {
          return <p key={ label }>{ `${ i18n.label[label] }: ${ routerVersion.object[label] }` }</p>
        }) }

        <RaisedButton
        onTouchTap={ this.toggleDialog.bind(this, 'openRestoreDialog') }
        label={ i18n.button.restore }
        secondary={ true } />

        <Dialog
        title={ `${ i18n.vocabulary.router } ${ (routerVersion.object.updated_at || routerVersion.object.created_at).toISOString() } ${i18n.button.restore}` }
        actions={ actions }
        modal={ false }
        onRequestClose={ this.toggleDialog.bind(this, 'openRestoreDialog') }
        open={ this.state.openRestoreDialog }>
          { i18n.question.confirm_reste_router }
        </Dialog>

      </CardText>
    </Card>
  }
}

export default RouterVersion
