import { Mongo } from 'meteor/mongo'
import { VehicleSchema } from '../schemas'

let Vehicles = new Mongo.Collection('vehicles')
Vehicles.attachSchema(VehicleSchema)

export default Vehicles
