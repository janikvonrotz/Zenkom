import React from 'react'
import { TextField, RaisedButton, IconButton, IconMenu, Chip,
  MenuItem } from 'material-ui'
import { RouterList } from './index'
import { connect } from 'react-redux'
import { setRouterFilter, increaseRouterListLimit, setRouterListLimit } from '../actions'
import { isAllowed } from '/imports/helpers'
import { debounce } from 'lodash'
import { NavigationExpandMore, ContentFilterList } from 'material-ui/svg-icons'

class RouterSearch extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      openFilterMenu: false,
      filter: {},
    }
    this.updateFilter = debounce(this.updateFilter, 500)
  }

  updateFilter(key, event, value){
    let { dispatch } = this.props
    let { filter } = this.state
    if (key === 'keyFilter'){
      filter[key] = value
    }
    if (key === 'search'){
      filter[key] = value
    }
    this.setState({ filter })
    dispatch(setRouterFilter(filter))
  }

  removeFilter(key){
    let { dispatch } = this.props
    let { filter } = this.state
    delete filter[key]
    this.setState({ filter })
    dispatch(setRouterFilter(filter))
  }

  increaseLimit(){
    let { dispatch } = this.props
    dispatch(increaseRouterListLimit())
  }

  setLimit(limit){
    let { dispatch } = this.props
    dispatch(setRouterListLimit(limit))
  }

  toggleMenu() {
    this.setState({
      openFilterMenu: !this.state.openFilterMenu
    })
  }

  render() {
    let { i18n, user, limit, statusOptions, headers } = this.props
    let { openFilterMenu, filter } = this.state

    return <div>

      <TextField
      style={{ float: 'right' }}
      floatingLabelText={ i18n.button.search }
      onChange={this.updateFilter.bind(this, 'search')} />

      <br /><br />

      <IconMenu
      iconButtonElement={ <IconButton style={{ display: 'none' }} /> }
      onChange={ this.updateFilter.bind(this, 'keyFilter') }
      onRequestChange={ this.toggleMenu.bind(this) }
      open={ openFilterMenu } >

        <MenuItem
        key={ 'router_in_dfi' }
        value={ { key: 'dfi_id', value: true, label: 'router_in_dfi' } }
        primaryText={ i18n.option.router_in_dfi } />

        <MenuItem
        key={ 'router_in_vehicle' }
        value={ { key: 'vehicle_id', value: true, label: 'router_in_vehicle' } }
        primaryText={ i18n.option.router_in_vehicle } />

        { statusOptions.map((option) => {
          return <MenuItem
            key={ option }
            value={ { key: 'status', value: option, label: option } }
            primaryText={ i18n.option[option] } />
        }) }
      </IconMenu>

      { isAllowed('routers.read', user ? user.roles : null) ?
      <RaisedButton
      onTouchTap={ this.toggleMenu.bind(this) }
      label={ i18n.button.filter_list }
      icon={ <ContentFilterList /> }
      secondary={ true } />
      : null }

      { filter && filter.keyFilter && filter.keyFilter.value ? <Chip
      style={ { marginTop: 5 } }
      onRequestDelete={ this.removeFilter.bind(this, 'keyFilter') } >
        { i18n.option[filter.keyFilter.label] }
      </Chip> : null }

      <RouterList headers={ headers } />

      { limit != 'all' ? <RaisedButton
      onTouchTap={ this.increaseLimit.bind(this) }
      label={ i18n.button.load_more }
      icon={ <NavigationExpandMore /> }
      primary={ true } /> : null }
      { limit != 'all' ? <p onTouchTap={ this.setLimit.bind(this, 'all') }>{ i18n.button.show_all }</p> : null }

    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    user: state.user,
    limit: state.routerListLimit,
    statusOptions: state.routerStatusOptions,
  }
}
export default connect(mapStateToProps)(RouterSearch)
