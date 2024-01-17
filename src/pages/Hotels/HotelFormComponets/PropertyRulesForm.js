import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import GenericFormAvfield from "../../../components/Form/GenricForm/GenricFormAvfield";
import MultipleSelector from "../../../components/Form/FormSelectorComponent/MultipleSelector";



const PropertyRulesForm = forwardRef((props, ref) => {


  const [formData, setFormData] = useState({
    paymentPolicy: "",
    ageRestriction: "",
    checkintime: "",
    checkouttime: "",
    facilities: null,
    petsRules: "",
    paymentMethods: null
  });

  const formFields = [
    { name: "checkintime", label: "Check-In Time", type: "time" },
    { name: "checkouttime", label: "Check-Out Time", type: "time" },
    { name: "paymentPolicy", label: "Cancellation/Payment Policy", required: true },
    { name: "ageRestriction", label: "Age restriction", required: true },
    { name: "petsRules", label: "Pets", required: true },

  ];

  const handleInputChange = (event, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value || event.target.value,
    }));
  };

  const handleFacilitiesChange = (selectedFacilities) => {
    setFormData((prevData) => ({ ...prevData, facilities: selectedFacilities }));
  };

  const handleClassStatusChange = (value) => {
    setFormData((prevData) => ({ ...prevData, releaseStatus: value }));
  };

  const submitForm = async () => {
    // Check if all required fields are filled
    const missingFields = formFields.filter(
      (field) => field.required && !formData[field.name]
    );

    if (missingFields.length > 0) {
      // Display error message for missing fields
      toastr.error(
        `Please fill in the following fields: ${missingFields
          .map((field) => field.label)
          .join(", ")}`
      );
      return;
    }
    // Implement the API call or any other logic for form submission
    try {
      // Example API call:
      // const res = await PropertyRulesAddApi(formData);
      // dispatch(getHotelId(res.data.propertyRules._id));
      // if (res.status === 201) {
      //   toastr.success(res.data.message);
      // }
      if (props.onSubmitSuccess) {
        props.onSubmitSuccess();
      }
    } catch (error) {
      console.error(error);
      toastr.error("Failed to create Property Rules");
    }
  };

  useImperativeHandle(ref, () => ({
    submitForm,
  }));

  return (
    <div>
      <Container fluid={true}>
        <AvForm>
          <GenericFormAvfield
            fields={formFields}
            onInputChange={handleInputChange}
          />
          {/* payment Selector */}
          <Row>
            <Col lg="6">
              <MultipleSelector
                label="Payment Methods"
                // value={selectedFacilities}
                onChange={submitForm}
                // options={facilitiesOptions}
              />
            </Col>

  



          </Row>
        </AvForm>
        {/* Additional form fields or components related to Property Rules */}
      </Container>
    </div>
  );
});

export default PropertyRulesForm;
