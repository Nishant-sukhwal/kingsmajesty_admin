import React from 'react';
import { Row, Col, Label, Input } from 'reactstrap';

const NumberInput = ({ label, id, value, onChange }) => {
    
  const handleInputChange = e => {
    onChange(id, e.target.value); // Pass the updated value back to the parent component
  };

  return (
    <Row className="mb-3">
      <Label htmlFor={id} className="col-md-2 col-form-label">
        {label}
      </Label>
      <Col md={10}>
        <Input type="number" id={id} value={value} onChange={handleInputChange} />
      </Col>
    </Row>
  );
};

export default NumberInput;

// // NumberInput.js
// import React from 'react';
// import { Row, Col, Label, Input } from 'reactstrap';

// const NumberInput = ({ label, id, value, defaultValue,onChange  }) => {

//     const handleInputChange = e => {
//         onChange(id, e.target.value); // Pass the updated value back to the parent component
//       };
    
//     return (
//         <Row className="mb-3">
//             <Label htmlFor={id} className="col-md-2 col-form-label">{label}</Label>
//             <Col md={10}>
//                 <Input type="number" defaultValue={defaultValue} id={id} value={value} onChange={handleInputChange}/>
//             </Col>
//         </Row>
//     );
// }

// export default NumberInput;
