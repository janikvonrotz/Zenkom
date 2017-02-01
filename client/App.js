import React from 'react'
import { Card, CardText, CardTitle } from 'material-ui'
import { setHeaderTitle } from './actions'

class App extends React.Component {

  componentWillReceiveProps(){
    let { dispatch } = this.props
    console.log(props)
    dispatch(setHeaderTitle('App'))
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

export default App
