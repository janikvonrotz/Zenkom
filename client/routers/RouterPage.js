import React from 'react'
import { Card, CardText, RaisedButton } from 'material-ui'
import { RouterSearch } from './index'
import { connect } from 'react-redux'
import { insertRouter, resetRouterListLimit, exportRouters } from '../actions'
import { isAllowed } from '/imports/helpers'
import { ContentAdd, FileFileDownload } from 'material-ui/svg-icons'

class RouterPage extends React.Component {

  componentDidMount(){
    let { dispatch } = this.props
    dispatch(resetRouterListLimit())
  }

  insert(){
    let { dispatch } = this.props
    dispatch(insertRouter())
  }

  export(){
    let { dispatch } = this.props
    dispatch(exportRouters())
  }

  render() {
    let { i18n, user } = this.props

    return <Card>
      <CardText>

        { isAllowed('routers.insert', user ? user.roles : null) ?
        <RaisedButton
        onTouchTap={ this.insert.bind(this) }
        label={ i18n.button.add_router }
        icon={ <ContentAdd /> }
        primary={true} />
        : null }

        <RouterSearch />

        { isAllowed('routers.export', user ? user.roles : null) ?
        <RaisedButton
        onTouchTap={ this.export.bind(this) }
        label={ i18n.button.download_csv }
        icon={ <FileFileDownload /> }
        secondary={ true } />
        : null }

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
export default connect(mapStateToProps)(RouterPage)
