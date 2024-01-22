import React from "react";
import { AvField } from "availity-reactstrap-validation";
import { Col, Label } from "reactstrap";

const TextInput = ({ label,name, placeholder, errorMessage, validation, onChange,defaultValue }) => {
  
  return (
    <div className="d-flex flex-row">
      <Label className="col-md-1 col-form-label" htmlFor={`validationCustom${label}`}>
        {label}
      </Label>
      <Col lg={5} >
      <AvField
        name={name}
        placeholder={placeholder}
        type="text"
        errorMessage={errorMessage}
        // className={`form-control ${validation ? "" : "is-invalid"}`}
        validate={{ required: { value: validation } }}
        id={`validationCustom${name}`}
        onChange={(e) => onChange(e, name)}
      />
      </Col>
    </div>
  );
};

export default TextInput;



