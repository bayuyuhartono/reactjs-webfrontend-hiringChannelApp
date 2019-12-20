import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import logo from '../images/arkademy.svg'

export default class HeaderAuth extends Component {
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
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <h2>Hiring Channel App</h2>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  }
}
