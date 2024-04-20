import React, { useEffect, useState } from "react";
import { Row, Col, Label, Input, FormFeedback } from "reactstrap";

const TextInput = ({
  label,
  id,
  fieldName,
  errorMessage,
  onChange,
  placeholder,
  defaultVal,
  value
}) => {

  const prefillledValue = defaultVal ? defaultVal : ''
  const [inputError, setInputError] = useState(false);
  const [inputValue, setInputValue] = useState();

  const handleInputChange = (e) => {
    const inputVal = e.target.value;
    setInputValue(inputVal)
    onChange(fieldName, inputValue);
    setInputError(inputValue.trim() === "");
  };

  useEffect(() => {
    setInputValue(defaultVal);
  },[defaultVal])

  return (
    <Row className="d-flex flex-row mb-3">
      <Label htmlFor={id} className="d-flex flex-row col-md-2 col-form-label">
        {label}
      </Label>
      <Col className="col-md-10">
        <Input
          type="text"
          // defaultValue={prefillledValue}
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

export default TextInput;
