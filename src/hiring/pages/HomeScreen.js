import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Button,Container,Row,Col,Dropdown,DropdownButton,ButtonGroup} from 'react-bootstrap'
import CardImage from '../components/CardImage'
import NotFound from '../components/NotFound'
import Header from './Header'
import Cookies from 'js-cookie'
import '../css/Grid.css'

export class HomeScreen extends Component {
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
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.sortBy = this.sortBy.bind(this);
        this.limit = this.limit.bind(this);
    }

    previousPage() {
        axios.get(this.state.pageInfo.prevPage,this.state.config)
        .then(res => {
            this.setState({pageInfo:res.data ,display: res.data.data, isLoading:false })
        })
        .catch(err => {
            console.log(err)
            this.props.history.push("/register")
        })
    }
    
    nextPage() {
        axios.get(this.state.pageInfo.nextPage,this.state.config)
        .then(res => {
            console.log(this.state.pageInfo.nextPage)
            this.setState({pageInfo:res.data ,display: res.data.data, isLoading:false })
        })
        .catch(err => {
            console.log(err)
            this.props.history.push("/register")
        })
    }

    sortBy(by) {
        this.setState({ sortBy: by ,isLoading: true})
        let url = `http://localhost:3030/api/v1/engineer?searchBy=${this.state.searchBy}&keyword=${this.state.searchKey}&sortBy=${by}&order=${this.state.order}&page=${this.state.page}&limit=${this.state.limit}`
        axios.get(url,this.state.config)
        .then(res => {
            console.log(url)
            this.setState({pageInfo:res.data ,display: res.data.data, isLoading:false })
        })
        .catch(err => {
            console.log(err)
            this.props.history.push("/register")
        })
    }

    limit(by) {
        this.setState({ limit: by ,isLoading: true})
        let url = `http://localhost:3030/api/v1/engineer?searchBy=${this.state.searchBy}&keyword=${this.state.searchKey}&sortBy=${this.state.sortBy}&order=${this.state.order}&page=${this.state.page}&limit=${by}`
        axios.get(url,this.state.config)
        .then(res => {
            console.log(url)
            this.setState({pageInfo:res.data ,display: res.data.data, isLoading:false })
        })
        .catch(err => {
            console.log(err)
            this.props.history.push("/register")
        })
    }

    orderBy(by) {
        this.setState({ order: by ,isLoading: true})
        let url = `http://localhost:3030/api/v1/engineer?searchBy=${this.state.searchBy}&keyword=${this.state.searchKey}&sortBy=${this.state.sortBy}&order=${by}&page=${this.state.page}&limit=${this.state.limit}`
        axios.get(url,this.state.config)
        .then(res => {
            console.log(url)
            this.setState({pageInfo:res.data ,display: res.data.data, isLoading:false })
        })
        .catch(err => {
            console.log(err)
            this.props.history.push("/register")
        })
    }

    onSearch = e => {
        console.log(e.target.value)
        this.setState({ keyword: e.target.value, searchKey: e.target.value, isLoading: true})
        let url = `http://localhost:3030/api/v1/engineer?searchBy=${this.state.searchBy}&keyword=${e.target.value}&sortBy=${this.state.sortBy}&order=${this.state.order}&page=${this.state.page}&limit=${this.state.limit}`
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
        let url = `http://localhost:3030/api/v1/engineer?searchBy=${this.state.searchBy}&keyword=${this.state.searchKey}&sortBy=${this.state.sortBy}&order=${this.state.order}&page=${this.state.page}&limit=${this.state.limit}`
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
        let currpage = this.state.pageInfo.current_page
        let totpage = this.state.pageInfo.total_page
        return (
            <>
            <Header onChangeValue={this.onSearch} keyword={this.state.keyword} />
            <Container style={{paddingTop:"15px"}}>
                <Row>
                    <Col xs={1}>
                        <DropdownButton variant="secondary" title="Limit">
                            <Dropdown.Item eventKey="12" onClick={() => this.limit('15')}>15</Dropdown.Item>
                            <Dropdown.Item eventKey="13" onClick={() => this.limit('20')}>20</Dropdown.Item>
                            <Dropdown.Item eventKey="14" onClick={() => this.limit('25')}>25</Dropdown.Item>
                            <Dropdown.Item eventKey="14" onClick={() => this.limit('30')}>30</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col xs={1}>
                        <DropdownButton variant="secondary" title="Sort By">
                            <Dropdown.Item eventKey="1" onClick={() => this.sortBy('name')}>Name</Dropdown.Item>
                            <Dropdown.Item eventKey="2" onClick={() => this.sortBy('skill')}>Skill</Dropdown.Item>
                            <Dropdown.Item eventKey="3" onClick={() => this.sortBy('dateUpdated')}>Date Updated</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col xs={1}>
                        <DropdownButton variant="secondary" title="Order">
                            <Dropdown.Item eventKey="4" onClick={() => this.orderBy('ASC')}>[A-Z]</Dropdown.Item>
                            <Dropdown.Item eventKey="5" onClick={() => this.orderBy('DESC')}>[Z-A]</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col xs={7}>
                        <ButtonGroup aria-label="Basic example">
                        <Button onClick={this.previousPage} variant="secondary">Previous</Button>
                        <Button disabled variant="secondary">{currpage} / {totpage}</Button>
                        <Button onClick={this.nextPage} variant="secondary">Next</Button>
                        </ButtonGroup>
                        &nbsp;&nbsp;
                    </Col>
                    <Col>
                        <Link to="/home2">
                            <Button variant="secondary">See Company</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
            {!this.state.display && <Container style={{paddingTop:"15px"}}><NotFound keyword={this.state.keyword}/></Container>}
            <div className="containerGrid">
                {isLoading && <p>Loading...</p>}
                {!isLoading && this.state.display && this.state.display.map(display => (
                    <CardImage list={display} />
                ))}
            </div>
            </>
        )
    }
}

export default HomeScreen
