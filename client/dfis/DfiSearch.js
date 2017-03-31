import React from 'react'
import { Card, CardText, TextField, RaisedButton } from 'material-ui'
import { DfiList } from './index'
import { connect } from 'react-redux'
import { insertDfi, setDfiFilter, resetListLimit, increaseListLimit,
  setListLimit } from '../actions'
import { isAllowed } from '/imports/helpers'

class DfiSearch extends React.Component {

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

  render() {
    let { i18n, user } = this.props

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
        primary={ true } />
        : null }

        <br /><br />

        <DfiList />

        <RaisedButton
        onTouchTap={ this.increaseLimit.bind(this) }
        label={ i18n.button.load_more }
        primary={ true } />
        <p onTouchTap={ this.setLimit.bind(this, 'all') }>{ i18n.button.show_all }</p>

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
export default connect(mapStateToProps)(DfiSearch)
