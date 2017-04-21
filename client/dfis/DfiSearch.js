import React from 'react'
import { Card, CardText, TextField, RaisedButton } from 'material-ui'
import { DfiList } from './index'
import { connect } from 'react-redux'
import { insertDfi, setDfiFilter, resetListLimit, increaseListLimit,
  setListLimit, exportDfis } from '../actions'
import { isAllowed } from '/imports/helpers'
import { debounce } from 'lodash'
import { ContentAdd, NavigationExpandMore, FileFileDownload } from 'material-ui/svg-icons'

class DfiSearch extends React.Component {

  constructor(props){
    super(props)
    this.updateFilter = debounce(this.updateFilter, 500)
  }

  componentDidMount(){
    let { dispatch } = this.props
    dispatch(resetListLimit())
    dispatch(setDfiFilter(''))
  }

  insert(){
    let { dispatch } = this.props
    dispatch(insertDfi())
  }

  updateFilter(){
    let { dispatch } = this.props
    let { filter } = this.refs
    dispatch(setDfiFilter(filter.getValue()))
  }

  increaseLimit(){
    let { dispatch } = this.props
    dispatch(increaseListLimit())
  }

  setLimit(limit){
    let { dispatch } = this.props
    dispatch(setListLimit(limit))
  }

  export(){
    let { dispatch } = this.props
    dispatch(exportDfis())
  }

  render() {
    let { i18n, user, limit } = this.props

    return <Card>
      <CardText>

        <TextField
        style={{ float: 'right' }}
        floatingLabelText={ i18n.button.search }
        ref="filter"
        onChange={this.updateFilter.bind(this)} />

        <br /><br />

        { isAllowed('dfis.insert', user ? user.roles : null) ?
        <RaisedButton
        onTouchTap={ this.insert.bind(this) }
        label={ i18n.button.add_dfi }
        icon={ <ContentAdd /> }
        primary={ true } />
        : null }

        <br /><br />

        <DfiList />

        { limit != 'all' ? <RaisedButton
        onTouchTap={ this.increaseLimit.bind(this) }
        label={ i18n.button.load_more }
        icon={ <NavigationExpandMore /> }
        primary={ true } /> : null }
        { limit != 'all' ? <p onTouchTap={ this.setLimit.bind(this, 'all') }>{ i18n.button.show_all }</p> : null }

        { isAllowed('dfis.export', user ? user.roles : null) ?
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
    limit: state.listLimit,
  }
}
export default connect(mapStateToProps)(DfiSearch)
