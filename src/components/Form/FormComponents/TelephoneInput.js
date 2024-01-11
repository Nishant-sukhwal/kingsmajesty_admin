// TelephoneInput.js
import React from 'react';
import { Row, Col, Label, Input } from 'reactstrap';

const TelephoneInput = ({ label, id, defaultValue }) => {
    return (
        <Row className="mb-3">
            <Label htmlFor={id} className="col-md-2 col-form-label">{label}</Label>
            <Col md={10}>
                <Input type="tel" defaultValue={defaultValue} id={id} />
            </Col>
        </Row>
    );
}

export default TelephoneInput;
