import React, { Component } from 'react'
import axios from 'axios'
import {Button,Container,Row,Col} from 'react-bootstrap'
import CardImage2 from '../components/CardImage2'
import NotFound from '../components/NotFound'
import { Link } from 'react-router-dom'
import Header from './Header'
import Cookies from 'js-cookie'
import '../css/Grid.css'

export class HomeScreen2 extends Component {
    constructor(){
        super()

        this.state = {
            config : {
                headers: {
                  "content-type": "application/x-www-form-urlencoded",
                  "email":  Cookies.get('hiringEmail'),
                  "Authorization": "Bearer " + Cookies.get('hiringToken')
                }
              },
            pageInfo: [],
            display: [],
            displayName: '',
            isLoading: false,
            keyword: '',
            searchBy: 'name',
            searchKey: '',
            sortBy: 'name',
            order: 'ASC',
            page: '1',
            limit: '15'
        }
    }

    onSearch = e => {
        console.log(e.target.value)
        this.setState({ keyword: e.target.value, searchKey: e.target.value, isLoading: true})
        let url = `http://localhost:3030/api/v1/company?searchBy=${this.state.searchBy}&keyword=${e.target.value}`
        axios.get(url,this.state.config)
        .then(res => {
            console.log(res.data)
            this.setState({pageInfo:res.data ,display: res.data.data, isLoading:false })
        })
        .catch(err => {
            console.log(err)
            this.setState({ isLoading:false })
        })
    }

    componentDidMount() {
        this.setState({isLoading: true})
        let url = `http://localhost:3030/api/v1/company`
        axios.get(url,this.state.config)
        .then(res => {
            console.log(res.data)
            this.setState({pageInfo:res.data ,display: res.data.data, isLoading:false })
        })
        .catch(err => {
            console.log(err)
            this.props.history.push("/")
        })
    }

    render() {        
        const {isLoading} = this.state
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
            {!this.state.display && <Container style={{paddingTop:"15px"}}><NotFound keyword={this.state.keyword}/></Container>}
            <div className="containerGrid">
                {isLoading && <p>Loading...</p>}
                {!isLoading && this.state.display && this.state.display.map(display => (
                    <CardImage2 list={display} />
                ))}
            </div>
            </>
        )
    }
}

export default HomeScreen2
