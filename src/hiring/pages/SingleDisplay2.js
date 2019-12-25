import React, { Component } from 'react'
import {
  Container,Button
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { WaveLoading } from 'react-loadingg'
import Header from './Header'
import ProfileCompany from '../components/ProfileCompany'

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.propsData.isError) {
        this.props.history.push('/register')
    }
  }

  render() {
    const { isLoading,companys } = this.props.propsData
    return (
      <>
        <Header />
        <Container style={{ paddingTop: '15px' }}>
          <Link to="/home2">
            <Button variant="secondary">Back</Button>
          </Link>
        </Container>
        <Container style={{ paddingTop: '15px', paddingBottom: '15px' }}>
          {isLoading && <WaveLoading speed={1} size='large' color='#6c757d' />}
          {!isLoading && companys.map((display) => (
            <ProfileCompany list={display} title="Company" editNeeded={false} />
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