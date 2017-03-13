import { Meteor } from 'meteor/meteor'
import { UserSchema } from '../schemas'

let Users = new Mongo.Collection('_users')
Users.attachSchema(UserSchema)
Meteor.users.attachSchema(UserSchema)

export default Users
