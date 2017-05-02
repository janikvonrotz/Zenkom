import React from 'react'
import { TextField, RaisedButton, Menu, Chip, Popover,
  MenuItem } from 'material-ui'
import { RouterList } from './index'
import { connect } from 'react-redux'
import { setRouterFilter, increaseRouterListLimit,
  setRouterListLimit } from '../actions'
import { isAllowed } from '/imports/helpers'
import { debounce } from 'lodash'
import { NavigationExpandMore, ContentFilterList, 
  NavigationArrowDropRight } from 'material-ui/svg-icons'

class RouterSearch extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      openFilterMenu: false,
    }
    this.updateFilter = debounce(this.updateFilter, 500)
  }

  updateFilter(key, event, value){
    let { dispatch, filter } = this.props
    
    // toggle filter menu
    key === 'keyFilter' ? this.setState({
      openFilterMenu: !this.state.openFilterMenu,
    }) : null

    filter[key] = value
    dispatch(setRouterFilter(filter))
  }

  removeFilter(key){
    let { dispatch, filter } = this.props
    delete filter[key]
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

  toggleMenu(event) {
    this.setState({
      openFilterMenu: !this.state.openFilterMenu,
      anchorEl: event.currentTarget,
    })
  }

  render() {
    let { i18n, user, limit, statusOptions, headers, filter, 
      companyOptions } = this.props
    let { openFilterMenu, anchorEl } = this.state

    return <div>

      <TextField
      style={{ float: 'right' }}
      defaultValue={ filter.search || '' }
      floatingLabelText={ i18n.button.search }
      onChange={this.updateFilter.bind(this, 'search')} />

      <br /><br />

      <Popover
      open={ openFilterMenu }
      anchorEl={ anchorEl }
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      onRequestClose={ this.toggleMenu.bind(this) }>
        <Menu
        onChange={ this.updateFilter.bind(this, 'keyFilter') }>

          <MenuItem
          key={ 'router_in_dfi' }
          value={ { key: 'dfi_id', value: true, label: 'router_in_dfi' } }
          primaryText={ i18n.option.router_in_dfi } />

          <MenuItem
          key={ 'router_in_vehicle' }
          value={ { key: 'vehicle_id', value: true, label: 'router_in_vehicle' } }
          primaryText={ i18n.option.router_in_vehicle } />

          <MenuItem
          rightIcon={ <NavigationArrowDropRight /> }
          primaryText={ i18n.label.status }
          menuItems={ statusOptions.map((option) => {
            return <MenuItem
              key={ option }
              onTouchTap={ (event) => this.updateFilter('keyFilter', 
                event, { key: 'status', value: option, label: option }) }
              primaryText={ i18n.option[option] } />
            })
          }/>

          <MenuItem
          rightIcon={ <NavigationArrowDropRight /> }
          primaryText={ i18n.label.transport_company }
          menuItems={ companyOptions.map((option) => {
            return <MenuItem
              key={ option }
              onTouchTap={ (event) => this.updateFilter('keyFilter', 
                event, { key: 'transport_company', value: option, label: option }) }
              primaryText={ option } />
            })
          }/>

        </Menu>
      </Popover>

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
        { i18n.option[filter.keyFilter.label] || filter.keyFilter.label }
      </Chip> : null }

      <RouterList headers={ headers } />

      { limit != 'all' ? <RaisedButton
      onTouchTap={ this.increaseLimit.bind(this) }
      label={ i18n.button.load_more }
      icon={ <NavigationExpandMore /> }
      primary={ true } /> : null }

      { limit != 'all' ? 
      <p onTouchTap={ this.setLimit.bind(this, 'all') }>{ i18n.button.show_all }</p>
      : null }

    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    user: state.user,
    filter: state.routerFilter,
    limit: state.routerListLimit,
    statusOptions: state.routerStatusOptions,
    companyOptions: state.routerCompanyOptions,
  }
}
export default connect(mapStateToProps)(RouterSearch)
