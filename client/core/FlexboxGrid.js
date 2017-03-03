import React from 'react'
import 'flexboxgrid/css/flexboxgrid.min.css'
import { Row, Col, BoxRow } from '../flexboxgrid'

let FlexboxGrid = (props) => {
    return <Row>
      <Col xs="0" sm="2" md="2" lg="1">
        <BoxRow />
      </Col>
      <Col xs="12" sm="8" md="8" lg="10">
        <BoxRow>{ props.children }</BoxRow>
      </Col>
      <Col xs="0" sm="2" md="2" lg="1">
        <BoxRow />
      </Col>
    </Row>
}

export default FlexboxGrid
