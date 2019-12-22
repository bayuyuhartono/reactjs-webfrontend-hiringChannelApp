import React, { Component } from 'react'
import axios from 'axios'
import {
  Container, Row, Col, Jumbotron, Button,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { WaveLoading } from 'react-loadingg'
import Header from './Header'
import ImageBox from '../components/ImageBox'

export default class SingleDisplay2 extends Component {
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
      getUrl: `${process.env.REACT_APP_SERVER_URL}/api/v1/company/${this.props.match.params.id}`,
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
        this.setState({ display: res.data.data })
        setTimeout(function() { //Start the timer
            console.log(res.data)
            this.setState({ isLoading:false })
        }.bind(this), process.env.REACT_APP_LOADING_TIME)
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
          <Link to="/home2">
            <Button variant="secondary">Back</Button>
          </Link>
        </Container>
        <Container style={{ paddingTop: '15px' }}>
          {isLoading && <WaveLoading speed={1} size='large' color='#6c757d' />}
          {!isLoading && this.state.display.map((display) => (
            <Row>
              <Col xs={3}>
                <ImageBox list={display.logo} />
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
                      <Col xs="2">Location</Col>
                                        :
                      <Col>{display.location}</Col>
                    </Row>
                    <Row>
                      <Col xs="2">Email</Col>
                                        :
                      <Col>{display.email}</Col>
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