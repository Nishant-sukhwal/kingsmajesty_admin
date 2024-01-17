// FormComponents/TextInput.js
import React from 'react';
import { Row, Col, Label, Input } from 'reactstrap';

const TextInput = ({ label, id, defaultValue }) => (
  <Row className="mb-3">
    <Label htmlFor={id}  className="col-md-2 col-form-label" >
      {label}
    </Label>
    <Col md={10} >
      <Input type="text" defaultValue={defaultValue} id={id} required/>
    </Col>
  </Row>
);

export default TextInput;


