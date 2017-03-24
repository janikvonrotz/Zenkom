import React from 'react'
import { Card, CardText, TextField, RaisedButton } from 'material-ui'
import { RouterList } from './index'
import { connect } from 'react-redux'
import { insertRouter, setRouterFilter, resetListLimit, increaseListLimit,
  setListLimit } from '../actions'

class RouterSearch extends React.Component {

  componentDidMount(){
    let { dispatch } = this.props
    dispatch(resetListLimit())
    dispatch(setRouterFilter(''))
  }

  insert(){
    let { dispatch } = this.props
    dispatch(insertRouter())
  }

  updateFilter(){
    let { dispatch } = this.props
    let { filter } = this.refs
    dispatch(setRouterFilter(filter.getValue()))
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
    let { i18n } = this.props

    return <Card>
      <CardText>

        <TextField
        style={{ float: 'right' }}
        floatingLabelText={ i18n.button.search }
        ref="filter"
        onChange={this.updateFilter.bind(this)} />

        <br /><br />

        <RaisedButton
        onTouchTap={ this.insert.bind(this) }
        label={ i18n.button.add_router }
        primary={true} />

        <br /><br />

        <RouterList />

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
  }
}
export default connect(mapStateToProps)(RouterSearch)
