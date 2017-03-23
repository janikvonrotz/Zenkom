import { objectAssign } from '/imports/helpers'

export const setHeaderTitle = (title) => {
  return {
    type: 'SET_HEADER_TITLE',
    title
  }
}

export const dismissMessage = () => {
  return {
    type: 'DISMISS_MESSAGE'
  }
}

export const switchLanguage = (language) => {
  return {
    type: 'SWITCH_LANGUAGE',
    language
  }
}

export const setListLimit = (limit) => {
  return {
    type: 'SET_LIST_LIMIT',
    limit
  }
}

export const setListSort = (sortKey) => {
  return (dispatch, getState) => {
    let sort = null
    let { listSort } = getState()

    if(sortKey) {
      if(listSort && sortKey && (Object.keys(listSort)[0] === sortKey)) {
        listSort[sortKey] = -(listSort[sortKey])
        sort = listSort
      } else {
        sort = {}
        sort[sortKey] = -1
      }
    }

    // clone sort object, otherwhise redux won't update subscribing components
    sort = objectAssign(sort)
    dispatch({
      type: 'SET_LIST_SORT',
      sort
    })
  }
}
