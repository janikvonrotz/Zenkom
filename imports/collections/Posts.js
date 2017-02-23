import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

let Posts = new Mongo.Collection('posts')
let schema = new SimpleSchema({
  title: {
    type: String,
    label: 'Title',
  },
  content: {
    type: String,
    label: 'Content',
  },
  createdAt: {
    type: Date,
    label: 'Created at',
  },
})
Posts.attachSchema(schema)

export default Posts
