import React from 'react';
import { Card, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ApiHttpServiceComponent from '../../services/api-http.service';

import CountryCardComponent from '../country-card/country-card.component';

import './home.component.css';

import { HomeProps, HomeState } from './home.model';

class HomeComponent extends React.Component<HomeProps, HomeState> {
    apiHttpService: ApiHttpServiceComponent = new ApiHttpServiceComponent();

    constructor(props: HomeProps) {
        super(props);

        this.state = {
            countries: [],
            regions: [],
            searchTerm: ''
        };
    }

    // For API calls and fetching data
    async componentDidMount() {
        let countriesData = await this.apiHttpService.getAllCountries();
        let regionsData = await this.apiHttpService.getAllRegions();

        // Getting unique locations from all locations
        let regions: any[] = [];
        regions = [...new Set(regionsData.map((reg: any) => {
        if (reg.region !== "" || reg.region !=="Polar") {
            return reg.region;
        }
        })) as any];

        this.setState({ 
            countries: countriesData,
            regions: regions.filter(e => e !== 'Polar')
        });
    }

    // Display country data
    displayCountryData() {
        return this.state.countries.filter((country: any) => {
            if (this.state.searchTerm == null) {
                return country;
            } else if (country.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                return country;
            }
        }).map((data:any) => {
            return (
                <CountryCardComponent key={data.alpha3Code} 
                            value={data.name} 
                            population={data.population} 
                            capital={data.capital} 
                            flag={data.flag} 
                            alpha3Code={data.alpha3Code}/>
            )
        });
    }

    // Display regions list in dropdown
    displayRegionsList() {
        return this.state.regions.map((region: string) => {
            return (
                <Link to={`/region/${region.toLowerCase()}`} key={region}>
                    <Dropdown.Item as="button" key={region}>
                        {region}    
                    </Dropdown.Item>
                </Link>
            );
        });
    }

    render() {
        return (
            <Container>
                <Row className="responsive-margin">
                    <Col xs={12} md={3} sm={4}>
                        <Form>
                            <Form.Group controlId="search-input">
                                <Form.Control type="text" 
                                    value={this.state.searchTerm} 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({searchTerm: e.target.value})} 
                                    placeholder="Search..." />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={12} md={6} sm={4}>
                        <Card className="shadow-none">
                            <Card.Body className="header-text padding-custom">
                                <Card.Text className="total-section">
                                    <span>{"Countries: " + this.state.countries.length}</span>
                                    <span>{"Regions: " + this.state.regions.length}</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3} sm={4}>
                        <DropdownButton id="dropdown-item-button" title="Filter by Region">
                            {this.displayRegionsList()}
                        </DropdownButton>
                    </Col>
                </Row>
                <Row>
                    {this.displayCountryData()}
                </Row>
            </Container>
        );
    }
}

export default HomeComponent;