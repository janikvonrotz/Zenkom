import RouterVersion from './RouterVersion'
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
  let router = Routers.findOne(params.id)

  return {
    router: router,
    routerVersion: router ? router.history.filter((version) => {
      return version._id === params.version
    })[0] : null,
    loading: !subscription.ready(),
  }
}, RouterVersion))
