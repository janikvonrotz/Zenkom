import { Meteor } from 'meteor/meteor'
import { browserHistory } from 'react-router'

export const insertDfi = (params) => {
  return (dispatch, getState) => {
    if (params) {
      Meteor.call('dfis.insert', params, (error) => {
        if (!error) {
          dispatch({
            type: 'SHOW_SUCCESS_MESSAGE',
            message: getState().i18n.message.dfi_added,
          })
          browserHistory.push('/dfis')
        } else {
          dispatch({
            type: 'SHOW_ERROR_MESSAGE',
            error,
          })
        }
      })
    } else {
      browserHistory.push('/dfi/new')
    }
  }
}

export const updateDfi = (params) => {
  return (dispatch, getState) => {
    Meteor.call('dfis.update', params, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.dfi_updated,
        })
        browserHistory.push('/dfis')
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}

export const removeDfi = (params) => {
  return (dispatch, getState) => {
    Meteor.call('dfis.remove', params, (error) => {
      if (!error) {
        dispatch({
          type: 'SHOW_SUCCESS_MESSAGE',
          message: getState().i18n.message.dfi_removed,
        })
        browserHistory.push('/dfis')
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}

export const setDfiFilter = (filter) => {
  return {
    type: 'SET_DFI_FILTER',
    filter
  }
}

export const exportDfis = () => {
  return (dispatch, getState) => {
    Meteor.call('dfis.export', (error, result) => {
      if (!error) {
        if (result.length != -1) {

          // setup csv
          let keys = Object.keys(result[0])

          // add headers
          let csvContent = keys.map((key) => {
            return `"${ getState().i18n.label[key] }"`
          }).join(',') + '\n'

          // add rows
          result.map((object) => {
            csvContent += keys.map((key) => {
              return `"${object[key]}"`
            }).join(',') + '\n'
          })

          // export file
          let link = document.createElement('a')
          link.setAttribute('href', 'data:text/csv;charset=utf-8,\uFEFF' + encodeURI(csvContent))
          link.setAttribute('download', 'export_dfis.csv')
          document.body.appendChild(link)
          link.click()

          dispatch({
            type: 'SHOW_SUCCESS_MESSAGE',
            message: getState().i18n.message.dfis_exported,
          })
        } else {
          dispatch({
            type: 'SHOW_ERROR_MESSAGE',
            message: getState().i18n.message.nothing_to_export,
          })
        }
      } else {
        dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          error,
        })
      }
    })
  }
}
