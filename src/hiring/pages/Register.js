import axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Tabs, Tab } from 'react-bootstrap'
import HeaderAuth from './HeaderAuth'

import { connect } from 'react-redux'
import { addAccount } from '../../public/redux/actions/Register'
import { fetchProfile } from '../../public/redux/actions/Profile'

require('dotenv').config()
class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      emailLogin: '',
      passwordLogin: '',
      emailCompany: '',
      passwordCompany: '',
      nameCompany: '',
      locationCompany: '',
      descriptionCompany: '',
      email: '',
      password: '',
      skill: '',
      dateOfBirth: '',
      age: '',
      location: '',
      expectedSallary: '',
      name: '',
      description: '',
      showcase: null,
      logoCompany: null,
      errors: [],
      config: {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          email: Cookies.get('hiringEmail'),
          Authorization: `Bearer ${Cookies.get('hiringToken')}`,
        },
      }
    }

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleCreateEngineer = this.handleCreateEngineer.bind(this)
    this.handleCreateCompany = this.handleCreateCompany.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
    this.handleFieldChaneFile = this.handleFieldChaneFile.bind(this)
  }

  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleFieldChaneFile(event) {
    this.setState({
      [event.target.name]: event.target.files[0],
    })
  }

  handleLogin(event) {
    event.preventDefault()
    if (!this.state.emailLogin || !this.state.passwordLogin) {
      return alert('email and password is required')
    }
    const formDataLogin = { email: this.state.emailLogin, password: this.state.passwordLogin }

    const config = {
      headers: {
        'content-type': 'application/json',
      },
    }

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/engineer/login`, formDataLogin, config)
      .then((response) => {
        console.log(response.data.error)
        console.log(this.state.emailLogin)
        console.log(response.data.data[0])
        Cookies.set('hiringEmail', response.data.data[0].email)
        Cookies.set('hiringId', response.data.data[0].id)
        Cookies.set('hiringWho', response.data.data[0].who)
        Cookies.set('hiringToken', response.data.data[0].token)
        window.location.reload()
        alert('Login Success as Engineer')
      })
      .catch((error) => {
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/company/login`, formDataLogin, config)
          .then((response) => {
            if (response.data.error) {
              alert('email or password not match')
              window.location.reload()
            } else {
              console.log(this.state.emailLogin)
              console.log(response.data.data[0])
              Cookies.set('hiringEmail', response.data.data[0].email)
              Cookies.set('hiringId', response.data.data[0].id)
              Cookies.set('hiringWho', response.data.data[0].who)
              Cookies.set('hiringToken', response.data.data[0].token)
              window.location.reload()
              alert('Login Success as Company')
            }
          })
          .catch((error) => {
            console.log(error)
            this.setState({
              errors: error,
            })
            window.location.reload()
            alert('email or password not match')
          })
      })
  }

  handleCreateEngineer(event) {
    event.preventDefault()
    if (!this.state.email) {
      return alert('Email is required')
    }
    if (!this.state.password) {
      return alert('Password is required')
    }
    if (!this.state.name) {
      return alert('Name is required')
    }
    if (!this.state.description) {
      return alert('Description is required')
    }
    if (!this.state.skill) {
      return alert('Skill is required')
    }
    if (!this.state.location) {
      return alert('Location is required')
    }
    if (!this.state.dateOfBirth) {
      return alert('Date Of Birth is required')
    }
    if (!this.state.showcase) {
      return alert('File is required')
    }
    if (!this.state.age) {
      return alert('Age is required')
    }
    if (!this.state.expectedSallary) {
      return alert('Expected Sallary is required')
    }
    console.log(this.state.showcase)
    const formData = new FormData()
    formData.append('createEmail', this.state.email)
    formData.append('createPassword', this.state.password)
    formData.append('name', this.state.name)
    formData.append('description', this.state.description)
    formData.append('skill', this.state.skill)
    formData.append('location', this.state.location)
    formData.append('dateOfBirth', this.state.dateOfBirth)
    formData.append('showcase', this.state.showcase)
    formData.append('age', this.state.age)
    formData.append('expectedSallary', this.state.expectedSallary)

    let url = `${process.env.REACT_APP_SERVER_URL}/api/v1/engineer`
    this.props.addAccount(url,formData) 
  }

  handleCreateCompany(event) {
    event.preventDefault()
    if (!this.state.emailCompany) {
      return alert('Email is required')
    }
    if (!this.state.passwordCompany) {
      return alert('Password is required')
    }
    if (!this.state.nameCompany) {
      return alert('Name Company is required')
    }
    if (!this.state.logoCompany) {
      return alert('File is required')
    }
    if (!this.state.locationCompany) {
      return alert('Location is required')
    }
    if (!this.state.descriptionCompany) {
      return alert('Description is required')
    }

    const formData = new FormData()
    formData.append('createEmail', this.state.emailCompany)
    formData.append('createPassword', this.state.passwordCompany)
    formData.append('name', this.state.nameCompany)
    formData.append('logo', this.state.logoCompany)
    formData.append('location', this.state.locationCompany)
    formData.append('description', this.state.descriptionCompany)

    let url = `${process.env.REACT_APP_SERVER_URL}/api/v1/company`
    this.props.addAccount(url,formData) 
  }

  componentDidMount() {
    if (Cookies.get('hiringId')) {
      this.setState({ isLoading: true })
      const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/${Cookies.get('hiringWho')}/${Cookies.get('hiringId')}`
      this.props.fetchProfile(url)  
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.propsData.added) {
      window.location.reload()
      alert('Account Has Been Created')
    }
    if (nextProps.propsData.message === 'email was taken') {
      alert('Sorry, Email Was Taken')
    }
    if (!nextProps.propsDataCek.isError) {
      this.props.history.push('/home')
    } else {
      Cookies.remove('hiringEmail')
      Cookies.remove('hiringId')
      Cookies.remove('hiringWho')
      Cookies.remove('hiringToken')
    }
  }

  hasErrorFor(field) {
    return !!this.state.errors[field]
  }

  renderErrorFor(field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className="invalid-feedback">
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      )
    }
  }

  render() {
    return (
      <>
        <HeaderAuth />
        <div className="container py-4">
          <div className="row justify-content-center" style={{ paddingTop: '10px' }}>
            {/* form Login */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header" style={{ backgroundColor: 'darkgray' }}>Login</div>

                <div className="card-body" style={{ backgroundColor: 'darkgray' }}>
                  <form onSubmit={this.handleLogin}>
                    <div className="form-group">
                      <label htmlFor="emailLogin">Email</label>
                      <input
                          style={{ backgroundColor: 'lightgray' }}
                          id="emailLogin"
                          type="email"
                          className={`form-control ${
                          this.hasErrorFor('emailLogin') ? 'is-invalid' : ''
                        }`}
                          name="emailLogin"
                          value={this.state.emailLogin}
                          onChange={this.handleFieldChange}
                        />
                      {this.renderErrorFor('emailLogin')}
                    </div>

                    <div className="form-group">
                      <label htmlFor="passwordLogin">Password</label>
                      <input
                          style={{ backgroundColor: 'lightgray' }}
                          id="passwordLogin"
                          type="password"
                          className={`form-control ${
                          this.hasErrorFor('passwordLogin') ? 'is-invalid' : ''
                        }`}
                          name="passwordLogin"
                          value={this.state.passwordLogin}
                          onChange={this.handleFieldChange}
                        />
                      {this.renderErrorFor('passwordLogin')}
                    </div>
                    <button className="btn btn-primary">Login</button>
                  </form>
                </div>
              </div>
            </div>
            {/* form Register */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header" style={{ backgroundColor: 'darkgray' }}>Register</div>

                <div className="card-body" style={{ backgroundColor: 'darkgray' }}>
                  <Tabs defaultActiveKey="company" id="uncontrolled-tab-example">
                    <Tab eventKey="company" title="Company">
                      <form onSubmit={this.handleCreateCompany}>
                          <div className="form-group">
                          <label htmlFor="emailCompany">Email</label>
                          <input
                          style={{ backgroundColor: 'lightgray' }}
                          id="emailCompany"
                          type="email"
                          className={`form-control ${
                            this.hasErrorFor('emailCompany') ? 'is-invalid' : ''
                          }`}
                          name="emailCompany"
                          value={this.state.emailCompany}
                          onChange={this.handleFieldChange}
                        />
                          {this.renderErrorFor('emailCompany')}
                        </div>

                          <div className="form-group">
                          <label htmlFor="passwordCompany">Password</label>
                          <input
                          style={{ backgroundColor: 'lightgray' }}
                          id="passwordCompany"
                          type="password"
                          className={`form-control ${
                            this.hasErrorFor('passwordCompany') ? 'is-invalid' : ''
                          }`}
                          name="passwordCompany"
                          value={this.state.passwordCompany}
                          onChange={this.handleFieldChange}
                        />
                          {this.renderErrorFor('passwordCompany')}
                        </div>

                          <div className="form-group">
                          <label htmlFor="nameCompany">Company Name</label>
                          <input
                          style={{ backgroundColor: 'lightgray' }}
                          id="nameCompany"
                          type="text"
                          className={`form-control ${
                            this.hasErrorFor('nameCompany') ? 'is-invalid' : ''
                          }`}
                          name="nameCompany"
                          value={this.state.nameCompany}
                          onChange={this.handleFieldChange}
                        />
                          {this.renderErrorFor('nameCompany')}
                        </div>

                          <div className="form-group">
                          <label htmlFor="logoCompany">Logo</label>
                          <input
                          style={{ backgroundColor: 'lightgray' }}
                          id="logoCompany"
                          type="file"
                          className={`form-control ${
                            this.hasErrorFor('logoCompany') ? 'is-invalid' : null
                          }`}
                          name="logoCompany"
                                // value={this.state.logoCompany}
                          onChange={this.handleFieldChaneFile}
                        />
                          {this.renderErrorFor('logoCompany')}
                        </div>

                          <div className="form-group">
                          <label htmlFor="locationCompany">location</label>
                          <input
                          style={{ backgroundColor: 'lightgray' }}
                          id="locationCompany"
                          type="text"
                          className={`form-control ${
                            this.hasErrorFor('locationCompany') ? 'is-invalid' : ''
                          }`}
                          name="locationCompany"
                          value={this.state.locationCompany}
                          onChange={this.handleFieldChange}
                        />
                          {this.renderErrorFor('locationCompany')}
                        </div>

                          <div className="form-group">
                          <label htmlFor="descriptionCompany">Description</label>
                          <textarea
                          style={{ backgroundColor: 'lightgray' }}
                          id="descriptionCompany"
                          className={`form-control ${
                            this.hasErrorFor('descriptionCompany') ? 'is-invalid' : ''
                          }`}
                          name="descriptionCompany"
                          rows="10"
                          value={this.state.descriptionCompany}
                          onChange={this.handleFieldChange}
                        />
                          {this.renderErrorFor('descriptionCompany')}
                        </div>

                          <button className="btn btn-primary">Register</button>
                        </form>
                    </Tab>
                    <Tab eventKey="engineer" title="Engineer">
                      <form onSubmit={this.handleCreateEngineer}>
                          <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                          style={{ backgroundColor: 'lightgray' }}
                          id="email"
                          type="email"
                          className={`form-control ${
                            this.hasErrorFor('email') ? 'is-invalid' : ''
                          }`}
                          name="email"
                          value={this.state.email}
                          onChange={this.handleFieldChange}
                        />
                          {this.renderErrorFor('email')}
                        </div>

                          <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <input
                          style={{ backgroundColor: 'lightgray' }}
                          id="password"
                          type="password"
                          className={`form-control ${
                            this.hasErrorFor('password') ? 'is-invalid' : ''
                          }`}
                          name="password"
                          value={this.state.password}
                          onChange={this.handleFieldChange}
                        />
                          {this.renderErrorFor('password')}
                        </div>

                          <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                          style={{ backgroundColor: 'lightgray' }}
                          id="name"
                          type="text"
                          className={`form-control ${
                            this.hasErrorFor('name') ? 'is-invalid' : ''
                          }`}
                          name="name"
                          value={this.state.name}
                          onChange={this.handleFieldChange}
                        />
                          {this.renderErrorFor('name')}
                        </div>

                          <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <textarea
                          style={{ backgroundColor: 'lightgray' }}
                          id="description"
                          className={`form-control ${
                            this.hasErrorFor('description') ? 'is-invalid' : ''
                          }`}
                          name="description"
                          rows="10"
                          value={this.state.description}
                          onChange={this.handleFieldChange}
                        />
                          {this.renderErrorFor('description')}
                        </div>

                          <div className="form-group">
                          <label htmlFor="skill">Skill</label>
                          <input
                          style={{ backgroundColor: 'lightgray' }}
                          id="skill"
                          type="text"
                          className={`form-control ${
                            this.hasErrorFor('skill') ? 'is-invalid' : ''
                          }`}
                          name="skill"
                          value={this.state.skill}
                          onChange={this.handleFieldChange}
                        />
                          {this.renderErrorFor('skill')}
                        </div>

                          <div className="form-group">
                          <label htmlFor="location">location</label>
                          <input
                          style={{ backgroundColor: 'lightgray' }}
                          id="location"
                          type="text"
                          className={`form-control ${
                            this.hasErrorFor('location') ? 'is-invalid' : ''
                          }`}
                          name="location"
                          value={this.state.location}
                          onChange={this.handleFieldChange}
                        />
                          {this.renderErrorFor('location')}
                        </div>

                          <div className="form-group">
                          <label htmlFor="dateOfBirth">Date Of Birth</label>
                          <input
                          style={{ backgroundColor: 'lightgray' }}
                          id="dateOfBirth"
                          type="date"
                          className={`form-control ${
                            this.hasErrorFor('dateOfBirth') ? 'is-invalid' : ''
                          }`}
                          name="dateOfBirth"
                          value={this.state.dateOfBirth}
                          onChange={this.handleFieldChange}
                        />
                          {this.renderErrorFor('dateOfBirth')}
                        </div>

                          <div className="form-group">
                          <label htmlFor="showcase">Showcase</label>
                          <input
                          style={{ backgroundColor: 'lightgray' }}
                          id="showcase"
                          type="file"
                          className={`form-control ${
                            this.hasErrorFor('showcase') ? 'is-invalid' : null
                          }`}
                          name="showcase"
                                // value={this.state.showcase}
                          onChange={this.handleFieldChaneFile}
                        />
                          {this.renderErrorFor('showcase')}
                        </div>

                          <div className="form-group">
                          <label htmlFor="age">Age</label>
                          <input
                          style={{ backgroundColor: 'lightgray' }}
                          id="age"
                          type="text"
                          className={`form-control ${
                            this.hasErrorFor('age') ? 'is-invalid' : ''
                          }`}
                          name="age"
                          value={this.state.age}
                          onChange={this.handleFieldChange}
                        />
                          {this.renderErrorFor('age')}
                        </div>

                          <div className="form-group">
                          <label htmlFor="expectedSallary">Expected Sallary</label>
                          <input
                          style={{ backgroundColor: 'lightgray' }}
                          id="expectedSallary"
                          type="text"
                          className={`form-control ${
                            this.hasErrorFor('expectedSallary') ? 'is-invalid' : ''
                          }`}
                          name="expectedSallary"
                          value={this.state.expectedSallary}
                          onChange={this.handleFieldChange}
                        />
                          {this.renderErrorFor('expectedSallary')}
                        </div>

                          <button className="btn btn-primary">Register</button>
                        </form>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  propsDataCek: state.profile,
  propsData: state.register
})

const mapDispatchToProps = dispatch => ({
  addAccount: (url,formData) => dispatch(addAccount(url,formData)),
  fetchProfile: (url,formData) => dispatch(fetchProfile(url,formData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
