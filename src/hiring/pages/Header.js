import React, { Component } from 'react'
import { Navbar, FormControl, Nav, Form, Col } from 'react-bootstrap'
import Cookies from 'js-cookie'
import logo from '../images/arkademy.svg'
import chat from '../images/chat.png'
import bell from '../images/bell.png'
import exit from '../images/exit.png'

import { connect } from 'react-redux'
import { fetchProfile } from '../../public/redux/actions/Profile'

export class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      display: [],
      displayName: '',
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.propsData.profile.length) {
        this.setState({ 
          display: nextProps.propsData.profile, 
          displayName: nextProps.propsData.profile[0].name
      })
    }
  }

  componentDidMount() {
    let url = `${process.env.REACT_APP_SERVER_URL}/api/v1/${Cookies.get('hiringWho')}/${Cookies.get('hiringId')}`
    this.props.fetchProfile(url)  
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
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Col>
          <Form inline>
            <FormControl
              className="mr-sm-2"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
              style={{
                width: '100%',
                backgroundColor: 'lightgrey',
                borderRadius: '10px',
              }}
              value={this.props.keyword}
              onChange={this.props.onChangeValue}
            />
          </Form>
          </Col>
          <Nav className="mr-auto">
            <Nav.Link
              href="/home"
              style={{
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
        </Navbar.Collapse>
        </Navbar>
      </>
    )
  }
}

const mapStateToProps = state => ({
  propsData: state.profile,
})

const mapDispatchToProps = dispatch => ({
  fetchProfile: url => dispatch(fetchProfile(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)