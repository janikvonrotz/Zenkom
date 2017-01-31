import { Meteor } from 'meteor/meteor'
import { seeds, accounts, methods, publications } from './index'

seeds()
methods()
publications()

Meteor.startup(() => {});
