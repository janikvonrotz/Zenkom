import DfiList from './DfiList'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data'
import { Dfis } from '/imports/collections'
import { Meteor } from 'meteor/meteor'

const mapStateToProps = (state) => {
  return {
    filter: state.dfiFilter,
    i18n: state.i18n,
    sort: state.listSort,
    limit: state.listLimit
  }
}
export default connect(mapStateToProps)(createContainer(({ filter, sort, limit }) => {
  sort = sort || { description: -1 }

  let subscription = Meteor.subscribe('dfis.list', filter, sort, limit)
  return {
    dfis: Dfis.find({}, { sort: sort }).fetch(),
    loading: !subscription.ready(),
  }
}, DfiList))
