import React, { Component } from 'react'
import { Container, Button } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { WaveLoading } from 'react-loadingg'
import Header from './Header'
import ProfileEngineer from '../components/ProfileEngineer'
import ProfileCompany from '../components/ProfileCompany'

import { connect } from 'react-redux'
import { fetchProfile, deleteAccount } from '../../public/redux/actions/Profile'

class Profile extends Component {
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
      getUrl: `${process.env.REACT_APP_SERVER_URL}/api/v1/${Cookies.get('hiringWho')}/${Cookies.get('hiringId')}`,
      display: [],
      displayName: '',
      isLoading: false,
    }
  }

  deleteAccount = _ => {
    if (window.confirm('Are You Sure to Delete Account?')) {
        let url = `${process.env.REACT_APP_SERVER_URL}/api/v1/${Cookies.get('hiringWho')}/${Cookies.get('hiringId')}`
        this.props.deleteAccount(url) 

        // console.log('in')
        // Cookies.remove('hiringEmail')
        // Cookies.remove('hiringId')
        // Cookies.remove('hiringWho')
        // Cookies.remove('hiringToken')
        // alert('Account Has Been Deleted')
        // window.location.reload()       

    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.propsData.deleted) {
        console.log('in')
        Cookies.remove('hiringEmail')
        Cookies.remove('hiringId')
        Cookies.remove('hiringWho')
        Cookies.remove('hiringToken')
        alert('Account Has Been Deleted')
        window.location.reload()     
    }
  }

  componentDidMount() {
    this.props.fetchProfile(this.state.getUrl)        
  }

  render() {
    const { isLoading } = this.props.propsData
    if (Cookies.get('hiringWho') === 'engineer') {
      return (
        <>
          <Header />
          <Container style={{ paddingTop: '15px', paddingBottom: '15px' }}>
            {isLoading && <WaveLoading speed={1} size='large' color='#6c757d' />}
            {!isLoading && this.props.propsData.profile.map((display) => (
              <ProfileEngineer list={display} />
            ))}
            {!isLoading && <Button variant="danger" onClick={this.deleteAccount} style={{ width: '287px' }}>Delete This Account</Button>}
          </Container>

        </>
      )
    }
    return (
      <>
        <Header />
        <Container style={{ paddingTop: '15px', paddingBottom: '15px' }}>
          {isLoading && <WaveLoading speed={1} size='large' color='#6c757d' />}
          {!isLoading && this.props.propsData.profile.map((display) => (
            <ProfileCompany list={display} />
          ))}
          {!isLoading && <Button variant="danger" onClick={this.deleteAccount} style={{ width: '287px' }}>Delete This Account</Button>}
        </Container>
      </>
    )
  }
}

const mapStateToProps = state => ({
  propsData: state.profile,
})

const mapDispatchToProps = dispatch => ({
  fetchProfile: url => dispatch(fetchProfile(url)),
  deleteAccount: url => dispatch(deleteAccount(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

