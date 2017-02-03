import { Meteor } from 'meteor/meteor'
import { seeds, accounts, methods, publications } from './index'
import ldap from './ldap'

seeds()
methods()
publications()

Meteor.startup(() => {});
