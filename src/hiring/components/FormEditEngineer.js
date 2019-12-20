import React, { Component } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

export default class FormEditEngineer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      skill: '',
      dateOfBirth: '',
      age: '',
      location: '',
      expectedSallary: '',
      name: '',
      description: '',
      showcase: null,
      errors: [],
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

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleEditEngineer = this.handleEditEngineer.bind(this)
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

  handleEditEngineer(event) {
    event.preventDefault()
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
    const formData = new FormData()
    formData.append('name', this.state.name)
    formData.append('description', this.state.description)
    formData.append('skill', this.state.skill)
    formData.append('location', this.state.location)
    formData.append('dateOfBirth', this.state.dateOfBirth)
    formData.append('showcase', this.state.showcase)
    formData.append('age', this.state.age)
    formData.append('expectedSallary', this.state.expectedSallary)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        email: Cookies.get('hiringEmail'),
        Authorization: `Bearer ${Cookies.get('hiringToken')}`,
      },
    }

    axios
      .put(`http://localhost:3030/api/v1/engineer/${Cookies.get('hiringId')}`, formData, config)
      .then((response) => {
        if (response.data.error) {
          alert('All the form is required')
        } else {
          console.log(response)
          this.props.history.push('/profil')
          alert('Engineer Account successfully Updated')
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
          name: res.data.data[0].name,
          location: res.data.data[0].location,
          description: res.data.data[0].description,
          skill: res.data.data[0].skill,
          dateOfBirth: res.data.data[0].dateOfBirth,
          age: res.data.data[0].age,
          expectedSallary: res.data.data[0].expectedSallary,
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
        <form onSubmit={this.handleEditEngineer}>
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

          <button className="btn btn-primary">Update</button>
        </form>
      </>
    )
  }
}
