import { HTTP } from 'meteor/http'
import { config } from '/imports/helpers'

export const getStatisticUrl = (hostname) => {

  // check if config is available
  if (!config.zabbix) {
    return null
  }
  
  // get auth token
  let result = HTTP.call('POST',
    config.zabbix.api_url,
    {
      data: {
        'jsonrpc': '2.0',
        'method': 'user.login',
        'params': {
            'user': config.zabbix.user,
            'password': config.zabbix.password
        },
        'id': 1,
        'auth': null
      }
    }
  )
  let authToken = result.data.result

  // get hostid
  result = HTTP.call('POST',
    config.zabbix.api_url,
    {
      data: {
        'jsonrpc': '2.0',
        'method': 'host.get',
        'params': {
            'output': [
                'hostid',
                'host'
            ],
            'selectInterfaces': [
                'interfaceid',
                'ip'
            ],
            'filter': {
                'host': [
                    hostname
                ]
            }
        },
        'id': 2,
        'auth': authToken
      }
    }
  )

  // get itemid and return chart url
  if (result.data.result[0]) {
    let hostId = result.data.result[0].hostid
    result = HTTP.call('POST',
      config.zabbix.api_url,
      {
        data: {
          'jsonrpc': '2.0',
          'method': 'item.get',
          'params': {
              'output':'extend',
              'hostids': hostId,
              'search': {
                  'name': '0Ping to NetModule'
              }
          },
          'id': 2,
          'auth': authToken
        }
      }
    )

    if (result.data.result[0]) {
      let itemId = result.data.result[0].itemid
      let url = `${ config.zabbix.url }/${ config.zabbix.chart_url }`.replace('{ itemid }', itemId)
      return url
    } else {
      return null
    }
  } else {
    return null
  }
}
