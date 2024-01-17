import React, { useState } from "react";
import { Row, Col, Label, Input, Form } from "reactstrap";
import {
  TelephoneInput,
  TextInput,
  TimeInput,
} from "../../components/Form/FormComponents";

import RadioButton from "../../components/Form/FormComponents/RadioButton";

import MultipleSelector from "../../components/Form/FormSelectorComponent/MultipleSelector";

const PropertyRules = () => {
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
  });
  const [selectedFacilities, setSelectedFacilities] = useState(null);


  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  


  const [selectedClassStatus, setSelectedClassStatus] = useState("");

  const handleFacilitiesChange = (selectedFacilities) => {
    setSelectedFacilities(selectedFacilities);
    setFormData((prevData) => ({ ...prevData, facilities: selectedFacilities }));
};


const facilitiesOptions = [
  {
      label: 'Card',
      options: [
          { label: 'Visa', value: 'Visa' },
          { label: 'Master', value: 'Master' },
          { label: 'Credit', value: 'Credit' },
      ],
  },
  {
      label: 'Online',
      options: [
          { label: 'UPI', value: 'UPI' },
          { label: 'Paypal', value: 'Paypal' },
          
      ],
  },
  {
      label: 'COD',
      options: [
          { label: 'Cash On Delivery', value: 'swimmingPool' },
      ],
  },
];
const petsOptions = [
  { label: "Allowed", value: "Allowed" },
  { label: "NotAllowed", value: "NotAllowed" },
];

const handleClassStatusChange = (value) => {
  setSelectedClassStatus(value);
  setFormData((prevData) => ({ ...prevData, releaseStatus: value }));
};

  return (
    <Form>
      {/* ... Form fields for Tab 1 */}

      <Row>
        <Col lg="6">
          <TimeInput
            label="Check-In Time"
            id="checkin-time-input"
            defaultValue="13:45:00"
            value={formData.checkintime}
          />
        </Col>
        <Col lg="6">
          <TimeInput
            label="Check-Out Time"
            id="checkout-time-input"
            defaultValue="13:45:00"
            value={formData.checkouttime}
          />
        </Col>
      </Row>

      <Row>
        <Col lg="6">
          {/* Title */}
          <TextInput
            label="Cancellation/Payment Policy"
            id="Payment-input"
            value={formData.title}
            onChange={(e) => handleInputChange(e, "title")}
            placeholder="Enter Cancellation/Payment Policy Info"
          />
        </Col>

        <Col lg="6">
          {/* SubTitle */}
          <TextInput
            label="Age restriction"
            id="tag-input"
            value={formData.tag}
            onChange={(e) => handleInputChange(e, "subtitle")}
            placeholder="Enter Age restriction Rules"
          />
        </Col>
      </Row>

      
      {/* payment Selector */}
      <Row>
        <Col lg="6">
          <MultipleSelector
            label="Payment Methods"
            value={selectedFacilities}
            onChange={handleFacilitiesChange}
            options={facilitiesOptions}
          />
        </Col>

        <Col lg="6">
     <div  className="d-flex align-items-center ">
      <Label className="col-2 col-form-label">Pets</Label>
 
       {petsOptions.map((option) => (
         <Col key={option.value} lg="2">
           <RadioButton
             id={`release-${option.value}`}
             name="classStatus"
             label={option.label}
             value={option.value}
             checked={selectedClassStatus === option.value}
             onChange={() => handleClassStatusChange(option.value)}
           />
         </Col>
       ))}
        

     </div>
   </Col>

      </Row>
    </Form>
  );
};

export default PropertyRules;
