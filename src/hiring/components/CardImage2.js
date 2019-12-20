import React from 'react'
import '../css/Grid.css'
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import IosMail from 'react-ionicons/lib/IosMail'

function CardImage2(props) {
  return (
    <div className="containerImage">
      <img src={props.list.logo} className="imageGrid" alt="cardImage2" />
      <div className="overlay">
        <Container>
          <Row>
            <Link to={`display2/${props.list.id}`} style={{ color: 'white', fontWeight: 'bolder' }}>
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
        </Container>
      </div>
    </div>
  )
}

export default CardImage2
