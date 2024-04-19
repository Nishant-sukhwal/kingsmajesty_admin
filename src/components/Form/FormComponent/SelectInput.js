import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Col, FormFeedback, Label, Row } from "reactstrap";

const SelectInput = ({
  value,
  onChange,
  options,
  label,
  fieldName,
  errorMessage,
  isMulti,
  placeholder,
  defaultVal,
  categoryVal
}) => {
  const [inputError, setInputError] = useState(false);
  const [defaultValue, setDefaultValue] = useState(null);
  
  // Set the default value for the Select component
  // const defaultValue = options.find(option => option.value === defaultVal);

  // useEffect(() => {

  //   try {
  //     if (Array.isArray(defaultVal)) {
  //       const defaultValue = JSON.parse(defaultVal);
  //       // If defaultVal is an array, find corresponding options for each value
  //       const defaultOptions = defaultValue.map(val => options.find(option => option.value === val));
  //       setDefaultValue(defaultOptions);
  //     }
  //     else {
  //       console.log("8888888888888888888888888888888888888888888888888888888888888888888888888888888888")
  //       // If defaultVal is a single value, find the corresponding option
  //       const defaultOption = options.find(option => option.value === defaultVal);
        
  //       setDefaultValue(defaultOption);
  //     }
  //   } catch (error) {
  //     //error is running because when delete any element then updates error at that time default value
  //     // console.error("Error parsing default value:", error); 
  //   }

  // }, [defaultVal]);


  useEffect(() => {
    try {
      if (defaultVal) {
        if (Array.isArray(defaultVal)) {
          // If defaultVal is an array, find corresponding options for each value
          const defaultValue = JSON.parse(defaultVal);
          const defaultOptions = defaultValue.map(val =>
            options.find(option => option.value === val)
          );
          setDefaultValue(defaultOptions);
        } else {
          // If defaultVal is a single value, find the corresponding option
          const defaultOption = options.find(
            option => option.value === defaultVal
          );
          setDefaultValue(defaultOption);
        }
      }
    } catch (error) {
      // console.error("Error parsing default value:", error);
    }
  }, [defaultVal]);


  const handleSelectChange = (selectedOption) => {
    if (Array.isArray(selectedOption)) {
      // Multi-selector input box
      // Extract values from selected options
      const selectedValues = selectedOption.map((option) => option.value);
      // Pass the array of selected values to the parent component
      onChange(fieldName, selectedValues);
      // Set input error based on whether any option is selected or not
      setInputError(selectedOption.length === 0);
      // Update the defaultValue state with the selected options
      setDefaultValue(selectedOption);

    } else {
      // Single selector input box
      // Pass the single selected value to the parent component
      onChange(fieldName, selectedOption ? selectedOption.value : null);
      // Set input error based on whether the option is selected or not
      setInputError(!selectedOption);
      // Update the defaultValue state with the single selected option
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
          classNamePrefix="select2-selection"
          isMulti={isMulti}
        />
        {inputError && <FormFeedback>{errorMessage}</FormFeedback>}
      </Col>
    </Row>
  );
};

export default SelectInput;













// const handleSelectChange = (selectedOption) => {
//   if (Array.isArray(selectedOption)) {
//     console.log("selectedOption from Array", selectedOption)
//     // Multi-selector input box
//     // Extract values from selected options
//     const selectedValues = selectedOption.map((option) => option.value);
//     // Pass the array of selected values to the parent component
//     onChange(fieldName, selectedValues);
//     // Set input error based on whether any option is selected or not
//     setInputError(selectedOption.length === 0);
//   } else {
//     // Single selector input box
//     console.log("selectedOption from Single", selectedOption)
//     // Pass the single selected value to the parent component
//     onChange(fieldName, selectedOption ? selectedOption.value : null);
//     // Set input error based on whether the option is selected or not
//     setInputError(!selectedOption);
//   }
// };

















// import React from 'react';
// import { Row, Col, Label } from 'reactstrap';

// const SelectInput = ({ label, options, onChange }) => {

//     const handleSelectChange = (event) => {
//         const selectedValue = event.target.value;
//         onChange(label, selectedValue);
//     };

//     return (
//         <Row className="mb-3">
//             <Label className="col-md-2 col-form-label">{label}</Label>
//             <Col md={10}>
//                 <select className="form-control" onChange={handleSelectChange}  >
//                     {options.map((option, index) => (
//                         <option key={index} value={option.value}>
//                             {option.label}
//                         </option>
//                     ))}
//                 </select>
//             </Col>
//         </Row>
//     );
// };

// export default SelectInput;
