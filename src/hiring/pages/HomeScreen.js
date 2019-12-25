import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Button,Container,Row,Col,Dropdown,DropdownButton,ButtonGroup} from 'react-bootstrap'
import { WaveLoading } from 'react-loadingg'
import CardImage from '../components/CardImage'
import NotFound from '../components/NotFound'
import Header from './Header'
import '../css/Grid.css'

import { connect } from 'react-redux'
import { fetchEngineers } from '../../public/redux/actions/EngineerList'

export class HomeScreen extends Component {
    constructor(){
        super()

        this.state = {
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
        if (parseInt(this.props.propsData.current_page) === 1) {
            return
        }
        this.props.fetchEngineers(this.props.propsData.prevPage)      
    }
    
    nextPage() {
        if (parseInt(this.props.propsData.current_page) === parseInt(this.props.propsData.total_page)) {
            return
        }
        this.props.fetchEngineers(this.props.propsData.nextPage)       
    }

    sortBy(by) {
        this.setState({ sortBy: by })
        let url = `${process.env.REACT_APP_SERVER_URL}/api/v1/engineer?searchBy=${this.state.searchBy}&keyword=${this.state.searchKey}&sortBy=${by}&order=${this.state.order}&page=${this.state.page}&limit=${this.state.limit}`
        this.props.fetchEngineers(url)        
    }

    limit(by) {
        this.setState({ limit: by })
        let url = `${process.env.REACT_APP_SERVER_URL}/api/v1/engineer?searchBy=${this.state.searchBy}&keyword=${this.state.searchKey}&sortBy=${this.state.sortBy}&order=${this.state.order}&page=${this.state.page}&limit=${by}`
        this.props.fetchEngineers(url)        
    }

    orderBy(by) {
        this.setState({ order: by })
        let url = `${process.env.REACT_APP_SERVER_URL}/api/v1/engineer?searchBy=${this.state.searchBy}&keyword=${this.state.searchKey}&sortBy=${this.state.sortBy}&order=${by}&page=${this.state.page}&limit=${this.state.limit}`
        this.props.fetchEngineers(url)        
    }

    onSearch = (e) => {
        console.log(e.target.value)
        this.setState({ keyword: e.target.value, searchKey: e.target.value })
        let url = `${process.env.REACT_APP_SERVER_URL}/api/v1/engineer?searchBy=${this.state.searchBy}&keyword=${e.target.value}&sortBy=${this.state.sortBy}&order=${this.state.order}&page=${this.state.page}&limit=${this.state.limit}`
        this.props.fetchEngineers(url)        
    }

    componentDidMount() {
        let url = `${process.env.REACT_APP_SERVER_URL}/api/v1/engineer?searchBy=${this.state.searchBy}&keyword=${this.state.searchKey}&sortBy=${this.state.sortBy}&order=${this.state.order}&page=${this.state.page}&limit=${this.state.limit}`
        this.props.fetchEngineers(url) 
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.propsData.isError) {
            this.props.history.push('/register')
        }
    }

    render() {        
        let currpage = this.props.propsData.current_page
        let totpage = this.props.propsData.total_page
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
            {this.props.propsData.isEmpty && <Container style={{paddingTop:"15px"}}><NotFound keyword={this.state.keyword}/></Container>}
            <div className="containerGrid">
                {this.props.propsData.isLoading && <WaveLoading speed={1} size='large' color='#6c757d' />}
                {!this.props.propsData.isLoading && this.props.propsData.engineers && this.props.propsData.engineers.map(engineer => (
                    <CardImage list={engineer} />
                ))}
            </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    propsData: state.engineers
})

const mapDispatchToProps = dispatch => ({
    fetchEngineers: url => dispatch(fetchEngineers(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
