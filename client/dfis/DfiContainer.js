import Dfi from './Dfi'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Dfis } from '/imports/collections'
import { Meteor } from 'meteor/meteor'

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    user: state.user,
    typeOptions: state.dfiTypeOptions,
    rowTypeOptions: state.dfiRowTypeOptions,
  }
}

export default connect(mapStateToProps)(createContainer(({ params }) => {
  let subscription = Meteor.subscribe('dfis.item', params.id)

  return {
    dfi: Dfis.findOne(params.id),
    loading: !subscription.ready(),
  }
}, Dfi))
