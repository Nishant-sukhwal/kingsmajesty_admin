import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import MultipleSelector from "../../../components/Form/FormSelectorComponent/MultipleSelector";
import { useSelector } from "react-redux";
import { FacilitiesAddApi, FacilitiesUpdateApi, getHotelByIdApi } from "../../../services/api/hotel/hotelCreateApi";
import GenralForm from "../../../components/Form/GenricForm/GenralForm";
import { useLocation } from "react-router-dom";

const FacilitiesForm = forwardRef((props, ref) => {
  const hotelId = useSelector((state) => state.Hotel.id);
  const hotel = useSelector((state) => state.Hotel.data);

  const hotelFacilities = hotel?.facilities || []; // Ensure hotel.facilities is not null or undefined

  // Extract only the labels from the hotelFacilities array
  const labels = hotelFacilities.map(item => item.label);

  // Convert the labels array into the desired format as a JSON string inside another array
  const formattedFacilities = JSON.stringify(labels);

  const facility = [formattedFacilities]

  console.log("formattedFacilities formattedFacilities ", facility);


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  console.log("hotel hotel hotel hotel hotel", hotel);
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
  console.log("formData in facility form", formData);

  const handleFormChange = (fieldName, value) => {
    console.log(fieldName, value);
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };



  useEffect(() => {


    console.log("id is here", id)
    const fetchData = () => {

      const hotelFacilities = hotel?.facilities || []; // Ensure hotel.facilities is not null or undefined

      // Extract only the labels from the hotelFacilities array
      const labels = hotelFacilities.map(item => item.label);

      // Convert the labels array into the desired format as a JSON string inside another array
      const formattedFacilities = JSON.stringify(labels);


      // Update formData with the formatted facilities
      setFormData(prevData => ({
        ...prevData,
        facilities: [formattedFacilities]
      }));
    }


    fetchData();

  }, [hotel]);




  const formFields = {
    form: [
      { fieldName: "facilities", label: "Facilities", type: "select", errorMessage: "Select Facilities", value: formData.facilities, placeholder: "Select Facilities", isMulti: true, options: fetchedFacilities, defaultValue: facility},
    ],
  };




  const submitForm = async () => {
    // Check if at least one facility is selected
    if (formData.facilities.length === 0) {
      toastr.error("Please select at least one facility");
      return;
    }
    try {
      const res = await FacilitiesUpdateApi(formData, id);
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