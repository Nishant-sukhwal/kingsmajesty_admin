import React from "react";
import Select from "react-select";
import { Label } from "reactstrap";

const SelectorInput = ({ value, onChange, options, label }) => {
  return (
    <div className="d-flex flex-row mb-3">
      <Label className="col-md-2 col-form-label">{label}</Label>
      <Select
        className="col-md-10"
        value={value}
        onChange={onChange}
        options={options}
        classNamePrefix="select2-selection"
      />
    </div>
  );
};

export default SelectorInput;
