import React, { useState } from "react";
import { Row, Col, Label, Input, FormFeedback } from 'reactstrap';

const TimeInput = ({ fieldName, label, id, defaultVal, onChange, placeholder, errorMessage }) => {

    const [inputError, setInputError] = useState(false);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        onChange(fieldName, inputValue);
        setInputError(inputValue.trim() === "");
    };


    return (
        <Row className="mb-3">
            <Label htmlFor={id} className="col-md-2 col-form-label">{label}</Label>
            <Col md={10}>
                <Input
                    type="time"
                    defaultValue={defaultVal}
                    value={defaultVal}
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
