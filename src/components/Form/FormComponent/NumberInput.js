import React, { useState } from "react";
import { Row, Col, Label, Input, FormFeedback } from "reactstrap";

const NumberInput = ({
  label,
  fieldName,
  onChange,
  errorMessage,
  placeholder,
  value,
  defaultValue,
  maxLength,
}) => {
  const [inputError, setInputError] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(fieldName, inputValue); // Pass the updated value back to the parent component
    setInputError(inputValue.trim() === "");
  };

  return (
    <Row className="mb-3">
      <Label htmlFor={fieldName} className="col-md-2 col-form-label">
        {label}
      </Label>
      <Col md={10}>
        <Input
          type="number"
          onChange={handleInputChange}
          value={value || defaultValue}
          placeholder={placeholder}
          required
          invalid={inputError}
          maxLength={maxLength}
        />
        {inputError && <FormFeedback>{errorMessage}</FormFeedback>}
      </Col>
    </Row>
  );
};

export default NumberInput;
