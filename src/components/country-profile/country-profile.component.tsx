import React from 'react';
import { Accordion, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';

import history from '../../services/history.component';
import HeaderTitleComponent from '../header-title/header-title.component';

import ApiHttpServiceComponent from '../../services/api-http.service';

import './country-profile.component.css';

import { CountryProfileProps, CountryProfileState } from './country-profile.model';

class CountryProfileComponent extends React.Component<CountryProfileProps, CountryProfileState> {
    apiHttpService: ApiHttpServiceComponent = new ApiHttpServiceComponent();

    constructor(props: CountryProfileProps) {
        super(props);
        this.state = ({
            name: '',
            nativeName: '',
            capital: '',
            region: '',
            population: 0,
            area: '',
            currencies: [],
            languages: [],
            borders: [],
            flag: ''
        });
    }

    // For API calls and fetching data
    async componentDidMount() {
        const countryProfile = await this.apiHttpService.getCountryByAplha3Code(this.props.match.params.alpha3Code);
        this.setState({ 
            name: countryProfile.name,
            nativeName: countryProfile.nativeName,
            capital: countryProfile.capital,
            region: countryProfile.region,
            population: countryProfile.population,
            area: `${countryProfile.area} sq km`,
            currencies: countryProfile.currencies,
            languages: countryProfile.languages,
            borders: countryProfile.borders,
            flag: countryProfile.flag
        });


        let borderCountries: string[] = []; 
        this.state.borders.map(async (border:string) => {
            const borders = await this.apiHttpService.getCountryByAplha3Code(border);
            borderCountries.push(borders.name);
            this.setState({
                borders: borderCountries
            });
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
                <HeaderTitleComponent title={"Country > " + this.state.name.toUpperCase() }/>
                <Row>
                    <Col xs={12} md={6} sm={12} className="center-image">
                        <Card className="country-profile-section">
                            <Card.Img className="custom-img-height" variant="top" src={this.state.flag} />
                        </Card>
                    </Col>
                    <Col xs={12} md={6} sm={12}>
                        <Card className="country-profile-section">
                            <Card.Body>
                            <Card.Text className="detail-card">
                                <span><strong>Native Name -</strong> {this.state.nativeName}</span>
                                <span><strong>Capital - </strong> {this.state.capital}</span>
                                <span><strong>Region - </strong> {this.state.region}</span>
                                <span><strong>Area - </strong> {this.state.area}</span>
                                <span><strong>Population - </strong> {this.state.population}</span>
                                <br />
                                <Accordion>
                                    <Card className="country-profile-list-section">
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                            <strong>Currencies</strong>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <ol>
                                                    {this.state.currencies.map((currency: any) => <li>{currency.name}</li>)}
                                                </ol>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card className="country-profile-list-section">
                                        <Accordion.Toggle as={Card.Header} eventKey="1">
                                            <strong>Languages</strong>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body>
                                                <ol>
                                                    {this.state.languages.map((language: any) => <li>{language.name}</li>)}
                                                </ol>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card className="country-profile-list-section">
                                        <Accordion.Toggle as={Card.Header} eventKey="2">
                                            <strong>Borders</strong>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="2">
                                            <Card.Body>
                                                <ol>
                                                    {this.state.borders.map((border: any) => <li>{border}</li>)}
                                                </ol>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CountryProfileComponent;