import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import { Posts, Routers } from '/imports/collections'

let seeds = () => {

  if(Posts.find({}).count() === 0){
    let posts = [
      {
        title: 'A hundred reasons why Meteor is great!',
        content: 'Lorem Ipsum\ndolor sit et amen',
        createdAt: new Date(),
      },
      {
        title: 'Why you should learn GraphQL with Apollo.',
        content: 'Lorem Ipsum\ndolor sit et amen',
        createdAt: new Date(),
      },
      {
        title: 'React has a promising future.',
        content: 'Lorem Ipsum\ndolor sit et amen',
        createdAt: new Date(),
      },
    ]

    console.info('Seed database with posts.')

    posts.map((post) => {
      Posts.insert(post)
    })
  }

  if(Routers.find({}).count() === 0){
    let routers = [
      {
        vehicle_id: 64,
        dfi_name: '',
        router_version: '3.5.10.100',
        type: 'NB2541',
        serial_number: '00112b0008ec',
        spos_id: '60002',
        status: 'In Betrieb',
        ip_router: '172.17.3',
        ip_cashbox: '',
        sim1: 89410112332700898478,
        sim2: 89410203634000002242,
        sim_itt: 89410203634000002242,
        phone1: '41770089847',
        phone2: '',
        phone_itt: '',
        profile: '2GB',
        notes: 'This is a test entry.',
        transport_company: 'vbl',
        installed_at: new Date(2009,2,26),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    console.info('Seed database with routers.')

    routers.map((router) => {
      Routers.insert(router)
    })
  }

  if (Meteor.users.find().count() === 0) {

    let users = [
      {
        email: 'admin@example.com',
        password: 'password',
        firstname: 'Admin',
        lastname: 'McAdmin',
        roles: [ 'admin' ],
      },
    ]

    users.map((user) => {

      console.info(`Seed database with user ${user.email}.`)

      let userId = Accounts.createUser({
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
