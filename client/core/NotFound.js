import React from 'react'
import { connect } from 'react-redux'
import { Card, CardText, CardTitle } from 'material-ui'
import { setHeaderTitle } from '../actions'

class NotFound extends React.Component {

  componentDidMount(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.vocabulary.unknown))
  }
  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.vocabulary.unknown))
  }

  render() {
    let { i18n } = this.props

    return <Card>
      <CardTitle title={ i18n.error.page_not_found } />
      <CardText>
        { i18n.hint.page_not_found }
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
