import React, { Component } from 'react'
import Cookies from 'js-cookie'

import { connect } from 'react-redux'
import { fetchProfile, updateAccount } from '../../public/redux/actions/Profile'

class FormEditEngineer extends Component {
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
    // if (!this.state.showcase) {
    //   return alert('File is required')
    // }
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

    let url = `${process.env.REACT_APP_SERVER_URL}/api/v1/engineer/${Cookies.get('hiringId')}`

    this.props.updateAccount(url,formData)
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.propsData.profile.length) {
        this.setState({
          name: nextProps.propsData.profile[0].name,
          location: nextProps.propsData.profile[0].location,
          description: nextProps.propsData.profile[0].description,
          skill: nextProps.propsData.profile[0].skill,
          dateOfBirth: nextProps.propsData.profile[0].dateOfBirth,
          age: nextProps.propsData.profile[0].age,
          expectedSallary: nextProps.propsData.profile[0].expectedSallary,
        })
    }
    if (nextProps.propsData.updated) {
        alert('Account Has Been Updated')
        this.props.history.push('/profil')   
    }
    if (nextProps.propsData.isError) {
      this.props.history.push('/register')
    }
  }

  componentDidMount() {
      let url = `${process.env.REACT_APP_SERVER_URL}/api/v1/${Cookies.get('hiringWho')}/${Cookies.get('hiringId')}`
      this.props.fetchProfile(url)        
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
              value={this.state.dateOfBirth.substring(0, 10)}
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

const mapStateToProps = state => ({
  propsData: state.profile,
})

const mapDispatchToProps = dispatch => ({
  fetchProfile: url => dispatch(fetchProfile(url)),
  updateAccount: (url, formData) => dispatch(updateAccount(url,formData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FormEditEngineer)