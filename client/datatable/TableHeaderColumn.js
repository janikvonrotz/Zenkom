import React from 'react'

export default (props) => {
  return <th
  onClick={ props.onClick }
  className="data-table-head-col">
    { props.children }
  </th>
}
