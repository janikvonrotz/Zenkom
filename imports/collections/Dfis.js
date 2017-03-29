import { Mongo } from 'meteor/mongo'
import { DfiSchema } from '../schemas'

let Dfis = new Mongo.Collection('dfis')
Dfis.attachSchema(DfiSchema)

export default Dfis
