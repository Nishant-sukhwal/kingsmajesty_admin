// RadioButton.js

import React from 'react';
import { Col, Input, Label, Row } from 'reactstrap';

const RadioButton = ({ id, name, label, value, defaultChecked }) => {
  return (
    <div className="form-check  ">
     
     
      <Input
        className="form-check-input"
        type="radio"
        id={id}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
      />
      <Label className="form-check-label " htmlFor={id}>
        {label}
      </Label>
    
    </div>
  );
};

export default RadioButton;
