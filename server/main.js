import { Meteor } from 'meteor/meteor'
import { seeds, accounts, methods, publications, ldap } from './index'

accounts()
ldap()
methods()
publications()
seeds()

Meteor.startup(() => {})
