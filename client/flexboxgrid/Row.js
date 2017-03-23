import React from 'react'

export default (props) => {
  return <div
  style={{
    marginRight: 0,
    marginLeft: 0
  }}
  className="row">
    { props.children }
  </div>
}
