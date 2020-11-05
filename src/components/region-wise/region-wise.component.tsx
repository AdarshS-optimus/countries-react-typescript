import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

import history from '../../services/history.component';
import CountryCardComponent from '../country-card/country-card.component';
import HeaderTitleComponent from '../header-title/header-title.component';

import ApiHttpServiceComponent from '../../services/api-http.service';

import { RegionWiseProps, RegionWiseState } from './region-wise.model';

class RegionWiseComponent extends React.Component<RegionWiseProps, RegionWiseState> {
    apiHttpService: ApiHttpServiceComponent = new ApiHttpServiceComponent();

    constructor(props: RegionWiseProps) {
        super(props);
        this.state = ({
            countries: [],
            searchTerm: ''
        });
    }

    // For API calls and fetching data
    async componentDidMount() {
          const countries = await this.apiHttpService.getCountriesByRegion(this.props.match.params.region);

          this.setState({ 
            countries: countries
        });
    }

    // Display countries data by region
    displayCountriesByRegion() {
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

    render() {
        return (
            <Container>
                <Row>
                    <Col xs={12}>
                        <Button className="mb-4" variant="primary" onClick={() => history.goBack()}>Go Back</Button>
                    </Col>
                </Row>
                <HeaderTitleComponent title={"Region > " + this.props.match.params.region.toUpperCase()}/>
                <Row className="responsive-margin">
                    <Col xs={12} md={4} sm={5}>
                        <Form>
                            <Form.Group controlId="search-input">
                                <Form.Control type="text" 
                                    value={this.state.searchTerm} 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({searchTerm: e.target.value})} 
                                    placeholder="Search..." />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={12} md={8} sm={7}>
                        <Card className="shadow-none">
                            <Card.Body className="header-text padding-custom">
                                <Card.Text className="total-section">
                                    <span>{"Countries: " + this.state.countries.length}</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    {this.displayCountriesByRegion()}
                </Row>
            </Container>
        );
    }
}

export default RegionWiseComponent;