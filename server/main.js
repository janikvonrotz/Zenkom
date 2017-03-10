import { Meteor } from 'meteor/meteor'
import { seeds, accounts, methods, publications, ldap, smtp } from './index'

seeds()
accounts()
methods()
publications()
ldap()

Meteor.startup(() => {
  smtp()
})
