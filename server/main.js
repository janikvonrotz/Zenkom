import { Meteor } from 'meteor/meteor'
import { seeds, accounts, methods, publications, ldap, smtp } from './index'
import { Users } from '/imports/collections'

Users()
accounts()
ldap()
methods()
publications()
seeds()

Meteor.startup(() => {
  smtp()
})
