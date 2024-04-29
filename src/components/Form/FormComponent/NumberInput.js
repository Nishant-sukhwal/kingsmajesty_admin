import React, { useState } from "react";
import { Row, Col, Label, Input, FormFeedback } from "reactstrap";

const NumberInput = ({
  label,
  fieldName,
  onChange,
  errorMessage,
  placeholder,
  value,
  defaultVal,
  maxLength,
}) => {
  const [inputError, setInputError] = useState(false);
  const [inputValue,setInputValue] = useState()

  const handleInputChange = (e) => {
    const inputVal = e.target.value;
    setInputValue(inputVal); // Update inputValue state with the new input value
    setInputError(inputVal.trim() === ""); // Check for input validation here if needed
    onChange(fieldName, inputVal); // Pass the current input value to the parent component
  };

  // const handleInputChange = (e) => {
  //   const inputValue = e.target.value;
  //   onChange(fieldName, inputValue); // Pass the updated value back to the parent component
  //   setInputError(inputValue.trim() === "");
  // };

  return (
    <Row className="mb-3">
      <Label htmlFor={fieldName} className="col-md-2 col-form-label">
        {label}
      </Label>
      <Col md={10}>
        <Input
          type="number"
          onChange={handleInputChange}
          value={inputValue}
          placeholder={placeholder}
          required
          invalid={inputError}
          maxLength={maxLength}
          // defaultValue={defaultVal}
        />
        {inputError && <FormFeedback>{errorMessage}</FormFeedback>}
      </Col>
    </Row>
  );
};

export default NumberInput;
