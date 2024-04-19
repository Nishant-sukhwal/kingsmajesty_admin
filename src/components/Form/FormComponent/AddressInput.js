import React, { useState } from "react";
import { Row, Col, Label, Input, FormFeedback } from "reactstrap";

const AddressInput = ({
  label,
  id,
  fieldName,
  defaultVal,
  errorMessage,
  value,
  onChange,
  placeholder,
}) => {
  const [inputError, setInputError] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(fieldName, inputValue);
    // Check if the input value is empty and set inputError accordingly
    setInputError(inputValue.trim() === "");
  };

  return (
    <Row className="d-flex flex-row mb-3">
      <Label htmlFor={id} className="d-flex flex-row col-md-1 col-form-label">
        {label}
      </Label>
      <Col className="col-md-11">
        <Input
          type="textarea"
          defaultValue={defaultVal}
          value={value}
          placeholder={placeholder}
          onChange={handleInputChange}
          required
          invalid={inputError}
        />
        {inputError && <FormFeedback>{errorMessage}</FormFeedback>}
      </Col>
    </Row>
  );
};

export default AddressInput;
