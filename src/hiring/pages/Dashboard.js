import React, { Component } from 'react'
import axios from 'axios'
import { Container, Button } from 'react-bootstrap'
import Cookies from 'js-cookie'
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
      getUrl: `http://localhost:3030/api/v1/${Cookies.get('hiringWho')}/${Cookies.get('hiringId')}`,
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
      axios.delete(`http://localhost:3030/api/v1/${Cookies.get('hiringWho')}/${Cookies.get('hiringId')}`, config)
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
        this.setState({ display: res.data.data, isLoading: false })
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
            {isLoading && <p>Loading...</p>}
            {!isLoading && this.state.display.map((display) => (
              <ProfileEngineer list={display} />
            ))}
            <Button variant="danger" onClick={this.deleteAccount} style={{ width: '287px' }}>Delete This Account</Button>
          </Container>

        </>
      )
    }
    return (
      <>
        <Header />
        <Container style={{ paddingTop: '15px', paddingBottom: '15px' }}>
          {isLoading && <p>Loading...</p>}
          {!isLoading && this.state.display.map((display) => (
            <ProfileCompany list={display} />
          ))}
          <Button variant="danger" onClick={this.deleteAccount} style={{ width: '287px' }}>Delete This Account</Button>
        </Container>
      </>
    )
  }
}
