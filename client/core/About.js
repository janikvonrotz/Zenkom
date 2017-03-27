import React from 'react'
import { connect } from 'react-redux'
import { Card, CardText, CardTitle } from 'material-ui'
import { setHeaderTitle } from '../actions'

class NotFound extends React.Component {

  componentDidMount(){
    this.componentWillReceiveProps()
  }
  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.button.about))
  }

  render() {
    let { i18n } = this.props

    return <Card>
      <CardTitle title="Zenkom" />
      <CardText>
        { i18n.text.about }
      </CardText>
    </Card>
  }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
  }
}
export default connect(mapStateToProps)(NotFound)
