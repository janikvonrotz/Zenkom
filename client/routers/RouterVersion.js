import React from 'react'
import { Card, CardText, CircularProgress, RaisedButton, Dialog,
  FlatButton, } from 'material-ui'
import { setHeaderTitle, restoreRouter } from '../actions'
import JsDiff from 'diff'
import { formatDate } from '/imports/helpers'

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
    dispatch(setHeaderTitle(routerVersion ? `${ i18n.vocabulary.router } ${ formatDate(i18n.locale, routerVersion.object.updated_at || routerVersion.object.created_at) }` : i18n.vocabulary.untitled ))
  }

  render() {
    let { routerVersion, loading, i18n, router } = this.props
    let keys = [
      'hostname',
      'vehicle_id',
      'dfi_name',
      'version',
      'type',
      'serial_number',
      'spos_id',
      'status',
      'ip_router',
      'ip_cashbox',
      'sim1',
      'sim2',
      'sim_itt',
      'phone1',
      'phone2',
      'phone_itt',
      'profile',
      'notes',
      'transport_company',
      'installed_at',
      'updated_at',
      'updated_by',
      'created_at',
      'created_by',
    ]

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

        { keys.map((label) => {

          // compare current and versioned router property value
          let routerVersionValue = routerVersion.object[label]
          let routerValue = router[label]
          let diffContent = []

          routerVersionValue = (routerVersionValue instanceof Date) ? formatDate(i18n.locale, routerVersionValue) : String(routerVersionValue)
          routerValue = (routerValue instanceof Date) ? formatDate(i18n.locale, routerValue) : String(routerValue)

          let diff = JsDiff.diffLines(String(routerVersionValue), String(routerValue))
          diff.forEach((part) => {
            diffContent.push(part)
          })

          return <p key={ label }>{ `${ i18n.label[label] }: ` }
            { diffContent.map((part) => {
              if (part.added) {
                return <span key={ part.value } style={ { color: 'green' } }>{ part.value }</span>
              }
              if (part.removed) {
                return <span key={ part.value } style={ { color: 'red' } }>{ part.value } </span>
              }
              if (!(part.removed && part.added)) {
                return <span key={ part.value }>{ part.value }</span>
              }
            }) }
          </p>
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
