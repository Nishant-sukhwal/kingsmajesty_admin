import React, { useState } from 'react';
import { Row, Col, Label, Input, FormFeedback } from 'reactstrap';

const TextInput = ({ label, id, fieldName, defaultValue, errorMessage, value, onChange, placeholder }) => {
  const [inputError, setInputError] = useState(false);

  const handleInputChange = e => {
    const inputValue = e.target.value;
    onChange(fieldName, inputValue);
    // Check if the input value is empty and set inputError accordingly
    setInputError(inputValue.trim() === '');
  };


  return (
    <Row className="d-flex flex-row">
      <Label htmlFor={id} className="d-flex flex-row col-md-2 col-form-label">
        {label}
      </Label>
      <Col className="col-md-10">
        <Input
          type="text"
          value={value || defaultValue}
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


// import React from 'react';
// import { Row, Col, Label, Input, FormFeedback } from 'reactstrap';

// const TextInput = ({ label, id, defaultValue, errorMessage }) => {
//   console.log(errorMessage);
//   return (
//     <div className="d-flex flex-row">
//       <Label htmlFor={id} className="col-md-1 col-form-label" >
//         {label}
//       </Label>
//       <div className="col-md-11" >
//         <Input type="text" defaultValue={defaultValue} id={id} required />
//         {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
//       </div>
//     </div>
//   )
// };

// export default TextInput;
