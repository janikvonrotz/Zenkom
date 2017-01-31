import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor';
import { Posts } from '/imports/collections'

let seeds = () => {

  if(Posts.find({}).count() === 0){
    let posts = [
      { title: 'A hundred reasons why Meteor is great!', createdAt: new Date(), },
      { title: 'Why you should learn GraphQL with Apollo.', createdAt: new Date(), },
      { title: 'React has a promising future.', createdAt: new Date(), },
    ]

    console.log(`Seed database with posts.`)

    posts.map((post) => {
      Posts.insert(post)
    })
  }

  if (Meteor.users.find().count() === 0 ) {

    let users = [
      {
        email: 'admin@example.com',
        password: 'password',
        firstname: 'Admin',
        lastname: 'McAdmin',
        roles: ['admin'],
      },
    ];

    users.map((user) => {

      console.log(`Seed database with user ${user.email}.`)

      var userId = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: {
          firstname: user.firstname,
          lastname: user.lastname,
          name: `${user.firstname} ${user.lastname}`
        },
        roles: user.roles,
      })
      Meteor.users.update(userId, { $set: { 'emails.0.verified': true } })
    })
  }
}

export default seeds
