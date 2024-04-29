import React, { useEffect, useState } from "react";
import { Row, Col, Label, Input, FormFeedback } from "reactstrap";

const EmailInput = ({
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
  const [inputValue,setInputValue] = useState()

  useEffect(() => {
    setInputValue(defaultVal);
  },[defaultVal]);


  const handleInputChange = (e) => {
    const inputVal = e.target.value;
    setInputValue(inputVal); // Update inputValue state with the new input value
    setInputError(inputVal.trim() === ""); // Check for input validation here if needed
    onChange(fieldName, inputVal); // Pass the current input value to the parent component
  };


  // const handleInputChange = (e) => {
  //   const inputVal = e.target.value;
  //   setInputValue(inputVal)
  //   onChange(fieldName, inputValue);
  //   // Check if the input value is empty and set inputError accordingly
  //   setInputError(inputValue.trim() === "");
  // };

  return (
    <Row className="d-flex flex-row mb-3">
      <Label htmlFor={id} className="d-flex flex-row col-md-2 col-form-label">
        {label}
      </Label>
      <Col className="col-md-10">
        <Input
          type="email"
          value={inputValue}
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

export default EmailInput;
