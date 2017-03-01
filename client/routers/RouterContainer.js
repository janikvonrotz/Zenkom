import Router from './Router'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Routers } from '/imports/collections'
import { Meteor } from 'meteor/meteor'

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
  }
}

export default connect(mapStateToProps)(createContainer(({ params }) => {
  let subscription = Meteor.subscribe('routers.item', params.id)
  return {
    router: Routers.findOne(params.id),
    loading: !subscription.ready(),
  }
}, Router))
