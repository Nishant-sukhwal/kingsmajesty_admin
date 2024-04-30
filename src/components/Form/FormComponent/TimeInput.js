import React, { useEffect, useState } from "react";
import { Row, Col, Label, Input, FormFeedback } from 'reactstrap';

const TimeInput = ({ fieldName, label, id, defaultVal, onChange, placeholder, errorMessage }) => {

    const [inputError, setInputError] = useState(false);
    const [inputValue, setInputValue] = useState();

    // const handleInputChange = (e) => {
    //     const inputValue = e.target.value;
    //     onChange(fieldName, inputValue);
    //     setInputError(inputValue.trim() === "");
    // };

    useEffect(() => {
        setInputValue(defaultVal);
      },[defaultVal]);
    
      const handleInputChange = (e) => {
        const inputVal = e.target.value;
        setInputValue(inputVal); // Update inputValue state with the new input value
        setInputError(inputVal.trim() === ""); // Check for input validation here if needed
        onChange(fieldName, inputVal); // Pass the current input value to the parent component
      };
    


    return (
        <Row className="mb-3">
            <Label htmlFor={id} className="col-md-2 col-form-label">{label}</Label>
            <Col md={10}>
                <Input
                    type="time"
                    defaultValue={defaultVal}
                    value={inputValue}
                    id={id}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    required
                />
                {inputError && <FormFeedback>{errorMessage}</FormFeedback>}
            </Col>
        </Row>
    );
}

export default TimeInput;
