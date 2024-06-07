import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Col, FormFeedback, Label, Row } from "reactstrap";

const SingleSelectInput = ({
    onChange,
    options,
    label,
    fieldName,
    errorMessage,
    isMulti,
    placeholder,
    defaultVal,
    categoryVal,
    index,
    arrayName
}) => {
    const [inputError, setInputError] = useState(false);
    const [defaultValue, setDefaultValue] = useState(null);
    
    console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||: ", defaultVal);

    useEffect(() => {
        console.log('inside each time when call **************************************************', defaultVal)
        if (defaultVal) {
            const defaultOption = options?.find(
                option => option.value === defaultVal,
            );
            setDefaultValue(defaultOption);        
        }
    }, [defaultVal,options]);

    const handleSelectChange = (selectedOption) => {
        // Single selector input box
        // Pass the single selected value to the parent component
        onChange(fieldName, selectedOption ? selectedOption.value : null, index, arrayName);
        // Set input error based on whether the option is selected or not
        setInputError(!selectedOption);
        // Update the defaultValue state with the single selected option
        setDefaultValue(selectedOption);
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
                    classNamePrefix="select2-selection"
                    isMulti={isMulti}
                />
                {inputError && <FormFeedback>{errorMessage}</FormFeedback>}
            </Col>
        </Row>
    )
}

export default SingleSelectInput;

