import React from 'react'
import '../css/Grid.css'
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import IosMail from 'react-ionicons/lib/IosMail'
import MdPricetag from 'react-ionicons/lib/MdPricetag'
import NumberFormat from 'react-number-format'

function CardImage(props) {
  return (
    <div className="containerImage">
      <img src={process.env.REACT_APP_SERVER_URL + props.list.showcase} className="imageGrid" alt="cardImage" />
      <div className="overlay">
        <Container>
          <Row>
            <Link to={`display/${props.list.id}`} style={{ color: 'white', fontWeight: 'bolder' }}>
              {props.list.name}
            </Link>
          </Row>
          <Row style={{ fontSize: '11px' }}>
            <Col style={{ padding: '0px' }}>
              <IosMail fontSize="13px" color="#43853d" />
                        &nbsp;&nbsp;
              {props.list.email}
            </Col>
          </Row>
          <Row style={{ fontSize: '11px' }}>
            <Col style={{ padding: '0px' }}>
              <MdPricetag fontSize="13px" color="#43853d" />
                        &nbsp;&nbsp;
              <NumberFormat value={props.list.expectedSallary} displayType="text" thousandSeparator prefix="Rp." />
            </Col>
          </Row>
          <Row style={{ fontSize: '11px', fontWeight: 'Bolder' }}>
            <Col style={{ padding: '0px' }}>Skills:</Col>
          </Row>
          <Row style={{ fontSize: '11px', fontWeight: 'Bolder' }}>
            <Col style={{ padding: '0px' }}>{props.list.skill}</Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default CardImage
