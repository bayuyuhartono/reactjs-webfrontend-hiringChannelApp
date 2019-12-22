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
import Moment from 'react-moment'
import { WaveLoading } from 'react-loadingg'

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
      getUrl: `${process.env.REACT_APP_SERVER_URL}/api/v1/engineer/${this.props.match.params.id}`,
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
          <Link to="/home">
            <Button variant="secondary">Back</Button>
          </Link>
        </Container>
        <Container style={{ paddingTop: '15px' }}>
          {isLoading && <WaveLoading speed={1} size='large' color='#6c757d' />}
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
                      <Col><Moment format="MMMM / DD / YYYY">{display.dateOfBirth}</Moment></Col>
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
