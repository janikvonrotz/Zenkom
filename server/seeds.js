import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import { Routers, Notifications, Vehicles } from '/imports/collections'

let seeds = () => {

  if(Routers.find({}).count() === 0){
    let routers = [
      {
        vehicle: {
          number: 64,
          status: 'In Betrieb',
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'Admin McAdmin',
          updated_by: 'Admin McAdmin',
        },
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
        created_by: 'Admin McAdmin',
        updated_by: 'Admin McAdmin',
        history: [],
        archived: false,
      },
      {
        vehicle: {
          number: 65,
          status: 'In Betrieb',
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'Admin McAdmin',
          updated_by: 'Admin McAdmin',
        },
        dfi_name: '',
        router_version: '3.5.10.100',
        type: 'NB2700-LU',
        serial_number: '00112b0008f3',
        spos_id: '60004',
        status: 'In Betrieb',
        ip_router: '172.17.4',
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
        installed_at: new Date(2010,4,21),
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'Admin McAdmin',
        updated_by: 'Admin McAdmin',
        history: [],
        archived: false,
      },
    ]

    console.info('Seed database with routers and vehicles.')

    routers.map((router) => {
      router.vehicle_id = Vehicles.insert(router.vehicle)
      Routers.insert(router)
    })
  }

  if(Notifications.find({}).count() === 0){
    let notifications = [
      {
        subject: 'Router 64 wurde aktualisiert',
        content: 'Heinz Keller hat bei Router 64 folgende Änderungen gemacht: ...',
        type: 'router_updated',
        receivers: [ 'all' ],
        created_at: new Date(),
        created_by: 'Admin McAdmin',
      },
    ]

    console.info('Seed database with notifications.')

    notifications.map((notification) => {
      Notifications.insert(notification)
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
