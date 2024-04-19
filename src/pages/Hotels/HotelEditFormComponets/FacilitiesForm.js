import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import MultipleSelector from "../../../components/Form/FormSelectorComponent/MultipleSelector";
import { useSelector } from "react-redux";
import { FacilitiesAddApi } from "../../../services/api/hotel/hotelCreateApi";
import GenralForm from "../../../components/Form/GenricForm/GenralForm";

const FacilitiesForm = forwardRef((props, ref) => {
  const hotelId = useSelector((state) => state.Hotel.id);

  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch(
          "http://localhost:8086/v1/new/facility/get-facilities"
        );
        const data = await response.json();
        const filteredFacilities = data.facilities.filter(
          (facility) => !facility.deleted
        );
        setFacilities(filteredFacilities);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };
  
    fetchFacilities();
  }, []);

  const fetchedFacilities = facilities.map((facility) => ({
    label: facility.facilityName,
    value: facility.facilityName,
  }));





  const [formData, setFormData] = useState({
    facilities: [],
  });
  console.log(formData);

  const handleFormChange = (fieldName, value) => {
    console.log(fieldName, value);
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const formFields = {
    form: [
      { fieldName: "facilities", label: "Facilities", type: "select", errorMessage: "Select Facilities", value: formData.facilities, placeholder: "Select Facilities", isMulti: true, options: fetchedFacilities, },
    ],
  };




  const submitForm = async () => {

    // Check if at least one facility is selected
    if (formData.facilities.length === 0) {
      toastr.error("Please select at least one facility");
      return;
    }

    try {

      const res = await FacilitiesAddApi(formData, hotelId);
      console.log(res);
      if (res.status === 200) {
        toastr.success(res.data.message);

      } else {
        toastr.error("something went wrong!");
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
        <GenralForm formFields={formFields} onChange={handleFormChange} />
      </Container>
    </div>
  );
});

export default FacilitiesForm;