import React, { Component } from 'react'
import { Navbar, FormControl, Nav } from 'react-bootstrap'
import axios from 'axios'
import Cookies from 'js-cookie'
import logo from '../images/arkademy.svg'
import chat from '../images/chat.png'
import bell from '../images/bell.png'
import exit from '../images/exit.png'

export class Header extends Component {
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
    this.logOut = this.logOut.bind(this)
  }

  logOut() {
    if (window.confirm('Are You Sure?')) {
      Cookies.remove('hiringEmail')
      Cookies.remove('hiringId')
      Cookies.remove('hiringWho')
      Cookies.remove('hiringToken')
      window.location.reload()
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    axios.get(this.state.getUrl, this.state.config)
      .then((res) => {
        this.setState({ display: res.data.data, displayName: res.data.data[0].name, isLoading: false })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <>
        <Navbar bg="light" expand="sm" style={{ boxShadow: '0 2px 5px 0 rgba(0,0,0,.25)' }}>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="100"
              height="45"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <FormControl
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon1"
            style={{
              width: '750px',
              backgroundColor: 'lightgrey',
              borderRadius: '10px',
            }}
            value={this.props.keyword}
            onChange={this.props.onChangeValue}
          />
          <Nav>
            <Nav.Link
              href="/home"
              style={{
                marginLeft: '15px',
                marginRight: '15px',
                fontWeight: 'bolder',
                color: 'black',
              }}
            >
Home
            </Nav.Link>
            <Nav.Link
              href="/profil"
              style={{
                fontWeight: 'bolder',
                color: 'white',
                backgroundColor: 'darkgray',
                borderRadius: '50%',
                width: '40px',
                textAlign: 'center',
              }}
            >
              {this.state.displayName.substring(0, 1)}
            </Nav.Link>
            <Nav.Link
              href="/profil"
              style={{
                fontWeight: 'bolder',
                color: 'darkgrey',
              }}
            >
              {this.state.displayName}
            </Nav.Link>
            <Nav.Link href="#home">
              <img
                src={chat}
                width="20"
                height="20"
                alt="React Bootstrap logo"
              />
            </Nav.Link>
            <Nav.Link>
              <img
                src={bell}
                width="20"
                height="20"
                alt="React Bootstrap logo"
              />
            </Nav.Link>
            <Nav.Link>
              <img
                src={exit}
                width="20"
                height="20"
                alt="React Bootstrap logo"
                onClick={this.logOut}
              />
            </Nav.Link>
          </Nav>
        </Navbar>
      </>
    )
  }
}

export default Header
