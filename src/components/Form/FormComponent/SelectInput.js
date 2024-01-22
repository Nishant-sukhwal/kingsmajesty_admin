import React from "react";
import Select from "react-select";
import { Label } from "reactstrap";

const SelectInput = ({ value, onChange, options, label ,fieldName}) => {
    const handleSelectChange = (selectedOption) => {
        onChange(fieldName, selectedOption.value);
      };
    
  return (
    <div className="d-flex flex-row mb-3">
      <Label className="col-md-2 col-form-label">{label}</Label>
      <Select
        className="col-md-10"
        value={value}
        onChange={handleSelectChange}
        options={options}
        classNamePrefix="select2-selection"
      />
    </div>
  );
};

export default SelectInput;

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
