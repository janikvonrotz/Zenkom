import { Meteor } from 'meteor/meteor'
import { seeds, accounts, methods, publications, ldap } from './index'

seeds()
accounts()
methods()
publications()
ldap()

Meteor.startup(() => {})
