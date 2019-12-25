import React, { Component } from 'react'
import {
  Container,Button
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from './Header'
import { WaveLoading } from 'react-loadingg'
import ProfileEngineer from '../components/ProfileEngineer'

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.propsData.isError) {
        this.props.history.push('/register')
    }
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
          <Container style={{ paddingTop: '15px', paddingBottom: '15px' }}>
            {isLoading && <WaveLoading speed={1} size='large' color='#6c757d' />}
            {!isLoading && engineers.map((display) => (
              <ProfileEngineer list={display} title="Engineer" editNeeded={false} />
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
