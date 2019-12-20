import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Cookies from 'js-cookie'
import Header from './Header'
import FormEditCompany from '../components/FormEditCompany'
import FormEditEngineer from '../components/FormEditEngineer'

export default class Edit extends Component {
  render() {
    if (Cookies.get('hiringWho') === 'engineer') {
      return (
        <>
          <Header />
          <div className="container py-4">
            <div className="row justify-content-center" style={{ paddingTop: '10px' }}>
              {/* form Edit */}
              <div className="col-md-6">
                <Link to="/profil">
                  <Button variant="secondary">Cancel</Button>
                </Link>
                <div className="card">
                  <div className="card-header" style={{ backgroundColor: 'darkgray' }}>Edit Data</div>

                  <div className="card-body" style={{ backgroundColor: 'darkgray' }}>
                    <FormEditEngineer history={this.props.history} />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
    return (
      <>
        <Header />
        <div className="container py-4">
          <div className="row justify-content-center" style={{ paddingTop: '10px' }}>
            {/* form Edit */}
            <div className="col-md-6">
              <Link to="/profil">
                <Button variant="secondary">Cancel</Button>
              </Link>
              <div className="card">
                <div className="card-header" style={{ backgroundColor: 'darkgray' }}>Edit Data</div>

                <div className="card-body" style={{ backgroundColor: 'darkgray' }}>
                  <FormEditCompany history={this.props.history} />

                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
