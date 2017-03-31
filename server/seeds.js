import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import { Routers, Notifications, Vehicles, Dfis } from '/imports/collections'

let seeds = () => {

  if (Routers.find({}).count() === 0) {
    let routers = [
      {
        hostname: 'netboxfz64',
        vehicle: {
          number: 64,
          status: 'vehicle_active',
          type: 'Trolley',
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'Janik von Rot',
          updated_by: 'Janik von Rotz',
          archived: false,
        },
        version: '3.5.10.100',
        type: 'NB2541',
        serial_number: '00112b0008ec',
        spos_id: '60002',
        status: 'router_active',
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
        transport_company: 'Verkehrsbetriebe Luzern',
        installed_at: new Date(2009,2,26),
        created_at: new Date(),
        created_by: 'Janik von Rotz',
        history: [],
        archived: false,
      },
      {
        hostname: 'netboxfz65',
        vehicle: {
          number: 65,
          status: 'vehicle_upgrade',
          type: 'Trolley',
          modification_until: new Date(2018,1,1),
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'Janik von Rotz',
          updated_by: 'Janik von Rotz',
          archived: false,
        },
        version: '3.5.10.100',
        type: 'NB2700-LU',
        serial_number: '00112b0008f3',
        spos_id: '60004',
        status: 'router_active',
        ip_router: '172.17.4',
        ip_cashbox: '',
        sim1: 89410112332700898478,
        sim2: 89410203634000002242,
        sim_itt: 89410203634000002242,
        phone1: '41770089847',
        phone2: '',
        phone_itt: '',
        profile: '4GB',
        notes: 'This is a test entry.',
        transport_company: 'Engadin Bus',
        installed_at: new Date(2010,4,21),
        created_at: new Date(),
        created_by: 'Janik von Rotz',
        history: [],
        archived: false,
      },
      {
        hostname: 'netboxfz66',
        dfi: {
          description: 'Pilatusplatz Obernau',
          type: 'Standard',
          row_type: '4',
          location: 'Luzern',
          notes: 'This is a test entry',
          created_at: new Date(),
          created_by: 'Janik von Rot',
          archived: false,
        },
        version: '3.5.10.100',
        type: 'NB2541',
        serial_number: '00112b0008ec',
        spos_id: '60002',
        status: 'router_active',
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
        transport_company: 'Verkehrsbetriebe Luzern',
        installed_at: new Date(2009,2,26),
        created_at: new Date(),
        created_by: 'Janik von Rotz',
        history: [],
        archived: false,
      },
      {
        hostname: 'netboxfz67',
        dfi: {
          description: 'Weinbergli Luzern',
          type: 'Standard',
          row_type: '8',
          location: 'Luzern',
          notes: 'This is a test entry',
          created_at: new Date(),
          created_by: 'Janik von Rot',
          archived: false,
        },
        version: '3.5.10.100',
        type: 'NB2700-LU',
        serial_number: '00112b0008f3',
        spos_id: '60004',
        status: 'router_active',
        ip_router: '172.17.4',
        ip_cashbox: '',
        sim1: 89410112332700898478,
        sim2: 89410203634000002242,
        sim_itt: 89410203634000002242,
        phone1: '41770089847',
        phone2: '',
        phone_itt: '',
        profile: '4GB',
        notes: 'This is a test entry.',
        transport_company: 'Engadin Bus',
        installed_at: new Date(2010,4,21),
        created_at: new Date(),
        created_by: 'Janik von Rotz',
        history: [],
        archived: false,
      },
    ]

    console.info('Seed database with routers and vehicles.')

    routers.map((router) => {
      if (router.vehicle) {
        router.vehicle_id = Vehicles.insert(router.vehicle)
      }
      if (router.dfi) {
        router.dfi_id = Dfis.insert(router.dfi)
      }
      Routers.insert(router)
    })
  }

  if (Notifications.find({}).count() === 0) {
    let notifications = [
      {
        subject: 'Router 64 wurde aktualisiert',
        content: 'Heinz Keller hat bei Router 64 folgende Änderungen gemacht: ...',
        type: 'router_updated',
        receivers: [ 'all' ],
        created_at: new Date(),
        created_by: 'Janik von Rotz',
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
        firstname: 'Janik',
        lastname: 'von Rotz',
        roles: [ 'admin' ],
        settings: {
          notifications: [ 'router_updated', 'router_broken' ],
          channels: [ 'email_notification' ],
          language: 'de',
        },
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
        settings: user.settings
      })
      Meteor.users.update(userId, { $set: { 'emails.0.verified': true } })
      Meteor.users.update(userId, { $set: { 'roles': user.roles } })

    })
  }
}

export default seeds
