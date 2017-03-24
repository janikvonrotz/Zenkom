import React from 'react'
import { Card, CardText, CardMedia } from 'material-ui'
import { setHeaderTitle } from '../actions'
import { connect } from 'react-redux'

class App extends React.Component {

  componentDidMount(){
    this.componentWillReceiveProps()
  }
  componentWillReceiveProps(){
    let { dispatch, i18n } = this.props
    dispatch(setHeaderTitle(i18n.button.dashboard))
  }

  render() {
    let { i18n, user } = this.props

    return <Card>
      <CardMedia>
        <img style={{ minWidth: '50px', width: 'none' }} src="/logo2.png" />
      </CardMedia>
      <CardText>
        { user ? <p>{ `${ i18n.vocabulary.greeting } ${ user.profile.name }` }</p> : null }
        <p>{ i18n.text.introduction }</p>
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
export default connect(mapStateToProps)(App)
