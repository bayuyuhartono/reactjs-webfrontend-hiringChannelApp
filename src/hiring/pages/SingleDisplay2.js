import React, { Component } from 'react'
import {
  Container, Row, Col, Jumbotron, Button,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { WaveLoading } from 'react-loadingg'
import Header from './Header'
import ImageBox from '../components/ImageBox'

import { connect } from 'react-redux'
import { fetchCompanySingle } from '../../public/redux/actions/CompanyList'

class SingleDisplay2 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      getUrl: `${process.env.REACT_APP_SERVER_URL}/api/v1/company/${this.props.match.params.id}`
    }
  }

  componentDidMount() {
    this.props.fetchCompanySingle(this.state.getUrl)
  }

  render() {
    const { isLoading } = this.props.propsData
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
          {!isLoading && this.props.propsData.companys.map((display) => (
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

const mapStateToProps = state => ({
  propsData: state.companys
})

const mapDispatchToProps = dispatch => ({
  fetchCompanySingle: url => dispatch(fetchCompanySingle(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleDisplay2)