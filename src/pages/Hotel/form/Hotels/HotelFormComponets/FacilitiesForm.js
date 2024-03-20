import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import MultipleSelector from "../../../components/Form/FormSelectorComponent/MultipleSelector";
import { useSelector } from "react-redux";
import { FacilitiesAddApi } from "../../../services/api/hotel/hotelCreateApi";

const FacilitiesForm = forwardRef((props, ref) => {
  const hotelId = useSelector((state) => state.Hotel.id);
  const [selectedFacilities, setSelectedFacilities] = useState(null);
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
  
  
  const facilitiesOptions = [
    {
      label: "Facilities",
      options: fetchedFacilities,
    },
  ];
  

  const [formData, setFormData] = useState({
    facilities: [],
  });
  console.log(formData);



  const handleFacilityChange = (selectedFacilities) => {
    setSelectedFacilities(selectedFacilities);
    setFormData((prevData) => ({ ...prevData, facilities: selectedFacilities }));
  };

  const submitForm = async () => {
    // Implement the API call for Property Rules form submission
    try {
      
      const res = await FacilitiesAddApi(formData,hotelId);
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
        <AvForm>
          <Row>
            <Col lg="6">
              <MultipleSelector
                label="Facilities"
                value={selectedFacilities}
                onChange={handleFacilityChange}
                options={facilitiesOptions}
              />
            </Col>
          </Row>
        </AvForm>
      </Container>
    </div>
  );
});

export default FacilitiesForm;