import React from "react";
import Select from "react-select";
import { Col, Label } from "reactstrap";

const MultipleSelector = ({ value, onChange, options, label, isDisabled }) => {
  return (
    <div className="d-flex flex-row mb-3">
      <Col>
       <Label  className="col-md-3 col-form-label mb-1">{label}</Label>
      
      <Select className="col-md-12"
        value={value}
        isMulti={true}
        onChange={onChange}
        options={options}
        classNamePrefix="select2-selection"
        isDisabled={isDisabled}
      />
      </Col>
    </div>
  );
};

export default MultipleSelector;
