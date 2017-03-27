import React from 'react'
import classNames from 'classnames'

export default (props) => {

  let { xs, sm, md, lg, xsOffset, smOffset, mdOffset, lgOffset,
    classes = {} } = props
  let style = {
    paddingRight: 0,
    paddingLeft: 0,
  }

  classes[`col-xs-${xs}`] = !!xs
  classes[`col-sm-${sm}`] = !!sm
  classes[`col-md-${md}`] = !!md
  classes[`col-lg-${lg}`] = !!lg
  classes[`col-xs-offset-${xsOffset}`] = !!xsOffset
  classes[`col-sm-offset-${smOffset}`] = !!smOffset
  classes[`col-md-offset-${mdOffset}`] = !!mdOffset
  classes[`col-lg-offset-${lgOffset}`] = !!lgOffset

  return <div style={ style } className={ classNames(classes) }>
    { props.children }
  </div>
}
