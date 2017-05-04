import { Meteor } from 'meteor/meteor'
import { seeds, accounts, ldap } from './actions'
import methods from './methods'
import publications from './publications'

accounts()
ldap()
methods()
publications()
seeds()

Meteor.startup(() => {})
