import React, { Component } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

export default class FormEditCompany extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nameCompany: '',
      locationCompany: '',
      descriptionCompany: '',
      logoCompany: null,
      errors: [],
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

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleEditCompany = this.handleEditCompany.bind(this)
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

  handleEditCompany(event) {
    event.preventDefault()
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
    formData.append('name', this.state.nameCompany)
    formData.append('logo', this.state.logoCompany)
    formData.append('location', this.state.locationCompany)
    formData.append('description', this.state.descriptionCompany)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        email: Cookies.get('hiringEmail'),
        Authorization: `Bearer ${Cookies.get('hiringToken')}`,
      },
    }
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/api/v1/company/${Cookies.get('hiringId')}`, formData, config)
      .then((response) => {
        if (response.data.error) {
          alert('All the form is required')
        } else {
          console.log(response)
          this.props.history.push('/profil')
          alert('Company Account successfully Updated')
        }
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          errors: error,
        })
      })
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

  componentDidMount() {
    this.setState({ isLoading: true })
    axios.get(this.state.getUrl, this.state.config)
      .then((res) => {
        console.log(res.data)
        this.setState({
          display: res.data.data,
          isLoading: false,
          nameCompany: res.data.data[0].name,
          locationCompany: res.data.data[0].location,
          descriptionCompany: res.data.data[0].description,
        })
      })
      .catch((err) => {
        console.log(err)
        this.props.history.push('/register')
      })
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleEditCompany}>
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

          <button className="btn btn-primary">Update</button>
        </form>
      </>
    )
  }
}
