import React from "react";
import { Col, Row } from 'react-bootstrap';

import { HeaderTitleProps } from './header-title.model';

const HeaderTitleComponent: React.FC<HeaderTitleProps> = (props) => (
    <Row>
        <Col xs={12} className="heading mb-4">
        {props.title}
        </Col>
    </Row>
);

export default HeaderTitleComponent;