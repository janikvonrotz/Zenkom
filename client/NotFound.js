import React from 'react'
import { Card, CardText, CardTitle } from 'material-ui'

class NotFound extends React.Component {
  render() {
    return <Card>
      <CardTitle title="Route not found" />
      <CardText>
        Sorry, but we could not find what you where looking for.
      </CardText>
    </Card>
  }
}

export default NotFound
