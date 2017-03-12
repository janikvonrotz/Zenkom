import { Meteor } from 'meteor/meteor'
import { UserSchema } from '../schemas'

export default () => {
  Meteor.users.attachSchema(UserSchema)
}
