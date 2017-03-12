import React from 'react'
import { Card, CardText, TextField, RaisedButton } from 'material-ui'
import { VehicleList } from './index'
import { connect } from 'react-redux'
import { insertVehicle, setVehicleFilter } from '../actions'

class VehicleSearch extends React.Component {

  insert(){
    let { dispatch } = this.props
    dispatch(insertVehicle())
  }

  updateFilter(){
    let { dispatch } = this.props
    let { filter } = this.refs
    dispatch(setVehicleFilter(filter.getValue()))
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
        label={ i18n.button.add_vehicle }
        primary={true} />

        <br /><br />

        <VehicleList />

      </CardText>
    </Card>
  }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
  }
}
export default connect(mapStateToProps)(VehicleSearch)
