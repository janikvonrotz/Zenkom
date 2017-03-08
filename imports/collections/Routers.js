import { Mongo } from 'meteor/mongo'
import { RouterSchema } from '../schemas'

let Routers = new Mongo.Collection('routers')
Routers.attachSchema(RouterSchema)

export default Routers
