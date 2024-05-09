import React, { useEffect, useState } from 'react';
import { Row, Col, Label, Input, FormFeedback } from "reactstrap";

const RadioButton = ({ fieldName, label, options, value, onChange, defaultVal }) => {
    const [selectedOption, setSelectedOption] = useState(value);

    useEffect(() => {
        setSelectedOption(defaultVal); // Update selectedOption when value prop changes
    }, [defaultVal]);

    const handleOptionChange = (e) => {
        const selectedOption = e.target.value;
        setSelectedOption(selectedOption);
        onChange(fieldName, selectedOption);
    };

    return (
        <Row className="d-flex flex-row mb-3">
            <Label className="d-flex flex-row col-md-2 col-form-label">{label}</Label>
            <Col className="col-md-10  d-flex flex-row align-items-center justify-content-start">
                {options.map((option, index) => (
                    <div key={index} className="form-check">
                        <Input
                            className="form-check-input"
                            type="radio"
                            id={`${fieldName}-${option}`}
                            name={fieldName}
                            value={option}
                            checked={selectedOption === option}
                            onChange={handleOptionChange}
                            defaultValue={defaultVal}
                        />
                        {/* className="form-check-label mx-2"  */}
                        <Label className="mx-2"  htmlFor={`${fieldName}-${option}`}>
                            {option}
                        </Label>
                    </div>
                ))}
            </Col>
        </Row>
    );
};

export default RadioButton;
