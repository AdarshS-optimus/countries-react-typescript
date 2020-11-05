import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { CountryCardProps, CountryCardState } from './country-card.model';

class CountryCardComponent extends React.Component<CountryCardProps, CountryCardState> {
    render() {
        const { value, population, capital, flag, alpha3Code } = this.props;
        return (
            <Col xs={12} md={3} sm={6}>
                <Card>
                    <Link to={`/${alpha3Code}`}>
                        <Card.Img variant="top" src={flag} />
                        <Card.Body>
                            <Card.Title>{value}</Card.Title>
                            <Card.Text>
                                <span>Population - {population}</span>
                                <span>Capital - {capital}</span>
                            </Card.Text>
                        </Card.Body>
                    </Link>
                </Card>
            </Col>
        );
    }
}

export default CountryCardComponent;