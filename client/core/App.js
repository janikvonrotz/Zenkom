import React from 'react'
import { Card, CardText, CardTitle } from 'material-ui'
import { setHeaderTitle } from '../actions'
import { connect } from 'react-redux'

class App extends React.Component {

  componentDidMount(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Zenkom'))
  }
  componentWillReceiveProps(){
    let { dispatch } = this.props
    dispatch(setHeaderTitle('Zenkom'))
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

export default connect()(App)
