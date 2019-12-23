import React, { Component } from 'react'
import axios from 'axios'
import {Button,Container,Row,Col} from 'react-bootstrap'
import CardImage2 from '../components/CardImage2'
import NotFound from '../components/NotFound'
import { Link } from 'react-router-dom'
import Header from './Header'
import '../css/Grid.css'
import { WaveLoading } from 'react-loadingg'

import { connect } from 'react-redux'
import { fetchCompanys } from '../../public/redux/actions/CompanyList'

export class HomeScreen2 extends Component {
    constructor(){
        super()

        this.state = {
            keyword: '',
            searchBy: 'name',
            searchKey: ''
        }
    }

    onSearch = e => {
        console.log(e.target.value)
        this.setState({ keyword: e.target.value, searchKey: e.target.value })
        let url = `${process.env.REACT_APP_SERVER_URL}/api/v1/company?searchBy=${this.state.searchBy}&keyword=${e.target.value}`
        axios.get(url,this.state.config)
        this.props.fetchCompanys(url) 
    }

    componentDidMount() {
        let url = `${process.env.REACT_APP_SERVER_URL}/api/v1/company`
        this.props.fetchCompanys(url) 
    }

    render() {        
        const {isLoading} = this.props.propsData
        return (
            <>
            <Header onChangeValue={this.onSearch} keyword={this.state.keyword} />
            <Container style={{paddingTop:"15px"}}>
                <Row>
                    <Col xs={10}>
                    </Col>
                    <Col>
                        <Link to="/home">
                            <Button variant="secondary">See Engineer</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
            {this.props.propsData.isEmpty && <Container style={{paddingTop:"15px"}}><NotFound keyword={this.state.keyword}/></Container>}
            <div className="containerGrid">
                {isLoading && <WaveLoading speed={1} size='large' color='#6c757d' />}
                {!isLoading && this.props.propsData.companys && this.props.propsData.companys.map(display => (
                    <CardImage2 list={display} />
                ))}
            </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    propsData: state.companys
})

const mapDispatchToProps = dispatch => ({
    fetchCompanys: url => dispatch(fetchCompanys(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen2)