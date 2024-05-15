

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Col, FormFeedback, Label, Row } from "reactstrap";

const MultiSelectInput = ({
    value,
    onChange,
    options,
    label,
    fieldName,
    errorMessage,
    placeholder,
    defaultVal
}) => {
    const [inputError, setInputError] = useState(false);
    const [defaultValue, setDefaultValue] = useState(null);
    console.log("defaultValue defaultValue defaultValue defaultValue ", defaultVal)
    
    useEffect(() => {
        // try {
        //     if (defaultVal) {
        //         if (Array.isArray(defaultVal)) {
        //             const defaultValue = JSON.parse(defaultVal);
        //             const defaultOptions = defaultValue.map(val =>
        //                 options.find(option => option.label === val)
        //             );
        //             setDefaultValue(defaultOptions);
        //         }
        //     }
        // } catch (error) {
        //     // console.error("Error parsing default value:", error);
        // }
        if (defaultVal) {
        setDefaultValue(defaultVal)
        }
    }, [defaultVal]);



    const handleSelectChange = (selectedOption) => {
        if (Array.isArray(selectedOption)) {
            console.log("selectedOption selectedOption ", selectedOption)
            // Multi-selector input box
            // Extract values from selected options
            const selectedValues = selectedOption.map((option) => option.value);
            // Pass the array of selected values to the parent component
            onChange(fieldName, selectedValues);
            // Set input error based on whether any option is selected or not
            setInputError(selectedOption.length === 0);
            // Update the defaultValue state with the selected options
            setDefaultValue(selectedOption);
        }
    };



    return (
        <Row className="mb-3">
            <Label className="col-md-2 col-form-label">{label}</Label>
            <Col className={`col-md-10`}>
                <Select
                    className={`${inputError ? "is-invalid" : ""}`}
                    value={defaultValue}
                    placeholder={placeholder}
                    onChange={handleSelectChange}
                    options={options}
                  
                    isMulti
                />
                {inputError && <FormFeedback>{errorMessage}</FormFeedback>}
            </Col>
        </Row>
    );
};

export default MultiSelectInput;
