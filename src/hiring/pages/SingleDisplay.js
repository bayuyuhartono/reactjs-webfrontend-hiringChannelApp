import React, { Component } from 'react'
import {
  Container, Row, Col, Jumbotron, Button,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import ImageBox from '../components/ImageBox'
import Header from './Header'
import Moment from 'react-moment'
import { WaveLoading } from 'react-loadingg'

import { connect } from 'react-redux'
import { fetchEngineerSingle } from '../../public/redux/actions/EngineerList'

class SingleDisplay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      getUrl: `${process.env.REACT_APP_SERVER_URL}/api/v1/engineer/${this.props.match.params.id}`
    }
  }

  componentDidMount() {
      this.props.fetchEngineerSingle(this.state.getUrl) 
  }

  render() {
    const { isLoading, engineers } = this.props.propsData
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
          {!isLoading && engineers.map((engineer) => (
            <Row>
              <Col xs={3}>
                <ImageBox list={engineer.showcase} />
              </Col>
              <Col>
                <Jumbotron fluid>
                  <Container>
                    <Row>
                      <Col xs="2">Name</Col>
                                        :
                      <Col>{engineer.name}</Col>
                    </Row>
                    <Row>
                      <Col xs="2">Age</Col>
                                        :
                      <Col>{engineer.age}</Col>
                    </Row>
                    <Row>
                      <Col xs="2">Date Of Birth</Col>
                                        :
                      <Col><Moment format="MMMM / DD / YYYY">{engineer.dateOfBirth}</Moment></Col>
                    </Row>
                    <Row>
                      <Col xs="2">Location</Col>
                                        :
                      <Col>{engineer.location}</Col>
                    </Row>
                    <Row>
                      <Col xs="2">Email</Col>
                                        :
                      <Col>{engineer.email}</Col>
                    </Row>
                    <Row>
                      <Col xs="2">Skill</Col>
                                        :
                      <Col>{engineer.skill}</Col>
                    </Row>
                    <Row>
                      <Col xs="2">Sallary</Col>
                                        :
                      <Col><NumberFormat value={engineer.expectedSallary} displayType="text" thousandSeparator prefix="Rp." /></Col>
                    </Row>
                    <Row>
                      <Col xs="2">Description</Col>
                                        :
                      <Col>{engineer.description}</Col>
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
  propsData: state.engineers
})

const mapDispatchToProps = dispatch => ({
  fetchEngineerSingle: url => dispatch(fetchEngineerSingle(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleDisplay)
