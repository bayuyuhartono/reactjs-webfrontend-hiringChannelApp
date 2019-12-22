import React, { Component } from 'react'
import axios from 'axios'
import { Container, Button } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { WaveLoading } from 'react-loadingg'
import Header from './Header'
import ProfileEngineer from '../components/ProfileEngineer'
import ProfileCompany from '../components/ProfileCompany'

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
      getUrl: `${process.env.REACT_APP_SERVER_URL}/api/v1/${Cookies.get('hiringWho')}/${Cookies.get('hiringId')}`,
      display: [],
      displayName: '',
      isLoading: false,
    }
  }

  deleteAccount() {
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        email: Cookies.get('hiringEmail'),
        Authorization: `Bearer ${Cookies.get('hiringToken')}`,
      },
    }
    if (window.confirm('Are You Sure to Delete Account?')) {
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/${Cookies.get('hiringWho')}/${Cookies.get('hiringId')}`, config)
        .then((res) => {
          console.log('in')
          Cookies.remove('hiringEmail')
          Cookies.remove('hiringId')
          Cookies.remove('hiringWho')
          Cookies.remove('hiringToken')
          alert('Account Has Been Deleted')
          window.location.reload()
        })
        .catch((err) => {
          console.log(err)
          this.props.history.push('/register')
        })
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
    if (Cookies.get('hiringWho') === 'engineer') {
      return (
        <>
          <Header />
          <Container style={{ paddingTop: '15px', paddingBottom: '15px' }}>
            {isLoading && <WaveLoading speed={1} size='large' color='#6c757d' />}
            {!isLoading && this.state.display.map((display) => (
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
          {!isLoading && this.state.display.map((display) => (
            <ProfileCompany list={display} />
          ))}
          {!isLoading && <Button variant="danger" onClick={this.deleteAccount} style={{ width: '287px' }}>Delete This Account</Button>}
        </Container>
      </>
    )
  }
}
