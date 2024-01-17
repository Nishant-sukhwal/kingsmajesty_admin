// // FormComponents/EmailInput.js
// import React from 'react';
// import { Label, Input } from 'reactstrap';

// const EmailInput = ({ label, id, defaultValue }) => (
//   <div className="d-flex flex-row mb-3">
//     <Label htmlFor={id} className="col-md-2 col-form-label">
//       {label}
//     </Label>
//     <div className="col-md-10">
//       <Input type="email" defaultValue={defaultValue} id={id} />
//     </div>
//   </div>
// );

// export default EmailInput;



// EmailInput.js

import React from 'react';
import { AvField } from 'availity-reactstrap-validation';

const EmailInput = ({ label, placeholder,validate }) => {
  return (
    <AvField
      name="email"
      label={label || 'E-Mail'}
      placeholder={placeholder || 'Enter Valid Email'}
      type="email"
      errorMessage="Invalid Email"
      validate={{
        required: { value: validate },
        email: { value: validate }
      }}
    />
  );
};

export default EmailInput;
