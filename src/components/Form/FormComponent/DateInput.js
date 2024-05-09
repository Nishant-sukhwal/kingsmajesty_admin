import React, { useEffect, useState } from "react";
import { Row, Col, Label, Input, FormFeedback } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

const DateInput = ({
  label,
  id,
  fieldName,
  errorMessage,
  onChange,
  placeholder,
  defaultVal,
}) => {
  const [selectedDate, setSelectedDate] = useState(defaultVal || null);
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    setSelectedDate(defaultVal || null);
  }, [defaultVal]);

  const handleDateChange = (dates) => {
    const date = dates[0];
    setSelectedDate(date);
    setInputError(false); // Reset error state on valid date selection
    onChange(fieldName, date);
  };

  return (
    <Row className="d-flex flex-row mb-3">
      <Label htmlFor={id} className="d-flex flex-row col-md-2 col-form-label">
        {label}
      </Label>
      <Col className="col-md-10">
        <Flatpickr
          className="form-control d-block"
          placeholder={placeholder}
          options={{
            altInput: true,
            altFormat: "F j, Y",
            dateFormat: "Y-m-d",
          }}
          value={selectedDate}
          onChange={handleDateChange}
        />
        {inputError && <FormFeedback>{errorMessage}</FormFeedback>}
      </Col>
    </Row>
  );
};

export default DateInput;
