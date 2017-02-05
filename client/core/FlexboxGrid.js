import React from 'react'
import 'flexboxgrid/css/flexboxgrid.min.css'

let FlexboxGrid = (props) => {
    return <div className="row">
      <div className="col-xs-0 col-sm-2 col-md-2 col-lg-1">
        <div className="box-row"></div>
      </div>
      <div className="col-xs-12 col-sm-8 col-md-8 col-lg-10">
        <div className="box-row">{ props.children }</div>
      </div>
      <div className="col-xs-0 col-sm-2 col-md-2 col-lg-1">
        <div className="box-row"></div>
      </div>
    </div>
}

export default FlexboxGrid
