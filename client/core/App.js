import React from 'react'
import { Card, CardText, CardTitle } from 'material-ui'
import { setHeaderTitle } from '../actions'
import { connect } from 'react-redux'

class App extends React.Component {

  componentDidMount(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.button.dashboard))
  }
  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.button.dashboard))
  }

  render() {
    return <Card>
      <CardTitle title="Zenkom" />
      <CardText>
        Welcome to Zenkom.
      </CardText>
    </Card>
  }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
  }
}
export default connect(mapStateToProps)(App)
