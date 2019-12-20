import React, { Component } from 'react'
import axios from 'axios'
import {
  Container, Row, Col, Jumbotron, Button,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import Cookies from 'js-cookie'
import ImageBox from '../components/ImageBox'
import Header from './Header'

export default class SingleDisplay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      config: {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          email: Cookies.get('hiringEmail'),
          Authorization: `Bearer ${Cookies.get('hiringToken')}`,
        },
      },
      getUrl: `http://localhost:3030/api/v1/engineer/${this.props.match.params.id}`,
      display: [],
      displayName: '',
      isLoading: false,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    axios.get(this.state.getUrl, this.state.config)
      .then((res) => {
        console.log(res.data)
        this.setState({ display: res.data.data, isLoading: false })
      })
      .catch((err) => {
        console.log(err)
        this.props.history.push('/register')
      })
  }

  render() {
    const { isLoading } = this.state
    return (
      <>
        <Header />
        <Container style={{ paddingTop: '15px' }}>
          <Link to="/home">
            <Button variant="secondary">Back</Button>
          </Link>
        </Container>
        <Container style={{ paddingTop: '15px' }}>
          {isLoading && <p>Loading...</p>}
          {!isLoading && this.state.display.map((display) => (
            <Row>
              <Col xs={3}>
                <ImageBox list={display.showcase} />
              </Col>
              <Col>
                <Jumbotron fluid>
                  <Container>
                    <Row>
                      <Col xs="2">Name</Col>
                                        :
                      <Col>{display.name}</Col>
                    </Row>
                    <Row>
                      <Col xs="2">Age</Col>
                                        :
                      <Col>{display.age}</Col>
                    </Row>
                    <Row>
                      <Col xs="2">Date Of Birth</Col>
                                        :
                      <Col>{display.dateOfBirth}</Col>
                    </Row>
                    <Row>
                      <Col xs="2">Email</Col>
                                        :
                      <Col>{display.email}</Col>
                    </Row>
                    <Row>
                      <Col xs="2">Skill</Col>
                                        :
                      <Col>{display.skill}</Col>
                    </Row>
                    <Row>
                      <Col xs="2">Sallary</Col>
                                        :
                      <Col><NumberFormat value={display.expectedSallary} displayType="text" thousandSeparator prefix="Rp." /></Col>
                    </Row>
                    <Row>
                      <Col xs="2">Description</Col>
                                        :
                      <Col>{display.description}</Col>
                    </Row>
                  </Container>
                </Jumbotron>
              </Col>
            </Row>
          ))}
        </Container>
      </>
    )
  }
}
