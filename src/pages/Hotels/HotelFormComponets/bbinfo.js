import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import GenericFormAvfield from "../../../components/Form/GenricForm/GenricFormAvfield";
import MultipleSelector from "../../../components/Form/FormSelectorComponent/MultipleSelector";
import { useSelector } from "react-redux";
import { PropertyRulesAddApi } from "../../../services/api/hotel/hotelCreateApi";
// import { PropertyRulesAddApi } from "../../../services/api/hotel/hotelCreateApi"; // Import the API for Property Rules


const PropertyRulesForm = forwardRef((props, ref) => {
  const hotelId = useSelector((state) => state.Hotel.id);
  const [selectedFacilities, setSelectedFacilities] = useState(null);

  const [formData, setFormData] = useState({
    paymentPolicy: "",
    ageRestriction: "",
    checkintime: "",
    checkouttime: "",
    PaymentMethods: [],
    petsRules: "",
    childRules: "",
  });
  console.log(formData);

  const formFields = [
    { name: "checkintime", label: "Check-In Time", type: "time" },
    { name: "checkouttime", label: "Check-Out Time", type: "time" },
    { name: "paymentPolicy", label: "Cancellation/Payment Policy", required: true },
    { name: "ageRestriction", label: "Age restriction", required: true },
    { name: "petsRules", label: "Pets", required: true },
    { name: "childRules", label: "Child policies", required: true },
  ];
  const facilitiesOptions = [
    {
      label: "Card",
      options: [
        { label: "Visa", value: "Visa" },
        { label: "Master", value: "Master" },
        { label: "Credit", value: "Credit" },
      ],
    },
    {
      label: "Online",
      options: [
        { label: "UPI", value: "UPI" },
        { label: "Paypal", value: "Paypal" },
      ],
    },
    {
      label: "COD",
      options: [
        { label: "Cash On Delivery", value: "swimmingPool" },
      ],
    },
  ];

  const handleInputChange = (event, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value || event.target.value,
    }));
  };

  const handlePaymentMethodChange = (selectedFacilities) => {
    setSelectedFacilities(selectedFacilities);
    setFormData((prevData) => ({ ...prevData, PaymentMethods: selectedFacilities }));
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

    // Implement the API call for Property Rules form submission
    try {
      const res = await PropertyRulesAddApi(formData,hotelId);
      console.log(res);
      if (res.status === 200) {
        toastr.success(res.data.message);
        if (props.onSubmitSuccess) {
          props.onSubmitSuccess();
        }
      }else{
        if (props.onSubmitSuccess) {
          props.onSubmitSuccess();
        }
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
          {/* Payment Selector */}
          <Row>
            <Col lg="6">
              <MultipleSelector
                label="Payment Methods"
                value={selectedFacilities}
                onChange={handlePaymentMethodChange}
                options={facilitiesOptions}
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
