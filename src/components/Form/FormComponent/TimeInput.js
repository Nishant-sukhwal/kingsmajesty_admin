import React, { useState } from "react";
import { Row, Col, Label, Input, FormFeedback } from 'reactstrap';

const TimeInput = ({ fieldName, label, id, defaultValue, onChange, placeholder, errorMessage }) => {

    const [inputError, setInputError] = useState(false);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        onChange(fieldName, inputValue);
        // Check if the input value is empty and set inputError accordingly
        setInputError(inputValue.trim() === "");
    };


    return (
        <Row className="mb-3">
            <Label htmlFor={id} className="col-md-2 col-form-label">{label}</Label>
            <Col md={10}>
                <Input
                    type="time"
                    defaultValue={defaultValue}
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
