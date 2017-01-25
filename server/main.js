import { Meteor } from 'meteor/meteor'
import { Tasks } from '/imports/collections'
import { seeds } from './index'

seeds()

Meteor.startup(() => {

});
