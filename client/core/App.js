import React from 'react'
import { Card, CardText, CardTitle } from 'material-ui'
import { setHeaderTitle } from '../actions'

class App extends React.Component {

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
