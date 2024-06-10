import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import GenericFormAvfield from "../../../components/Form/GenricForm/GenricFormAvfield";
import MultipleSelector from "../../../components/Form/FormSelectorComponent/MultipleSelector";
import { useSelector } from "react-redux";
import { FacilitiesUpdateApi, PropertyRulesAddApi, PropertyRulesUpdateApi } from "../../../services/api/hotel/hotelCreateApi";
import GenralForm from "../../../components/Form/GenricForm/GenralForm";
import { useLocation } from "react-router-dom";
import { getFacilityListAPI } from "../../../services/api/facilityCreateApi";


const FacilitiesForm = forwardRef((props, ref) => {
  const hotelId = useSelector((state) => state.Hotel.id);
  const [selectedFacilities, setSelectedFacilities] = useState(null);
  const hotel = useSelector((state) => state.Hotel.data);
  console.log("hotel inside hotel------------------------------>", hotel)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id")
  const [paymentOptions, setPaymentOptions] = useState();
  const [paymentMethods, setPaymentmethods] = useState();
  const [facilities, setFacilities] = useState([]);
  const [formData, setFormData] = useState({
    facilities: [],
  });
  console.log(formData);


  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      facilities: hotel?.facilities,
    }))
  }, [hotel, id])

  const handleFormChange = (fieldName, value) => {
    console.log(fieldName, value);
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };


  const fetchPaymentOptions = async () => {
    try {
      const res = await getFacilityListAPI();
      console.log(res.facilities);
      const formattedData = res.facilities.map(method => ({
        label: method.facilityName,
        value: method.facilityName,
      }));
      setFacilities(formattedData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPaymentOptions();
  }, [id])


  const formFields = {
    form: [
      { fieldName: "facilities", label: "Facilities", type: "multiselect", errorMessage: "Select Facilities", value: formData.facilities, placeholder: "Select Facilities", isMulti: true, options: facilities, defaultValue: hotel?.facilities, },
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


// import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
// import { Col, Container, Row } from "reactstrap";
// import { AvForm } from "availity-reactstrap-validation";
// import toastr from "toastr";
// import "toastr/build/toastr.min.css";
// import MultipleSelector from "../../../components/Form/FormSelectorComponent/MultipleSelector";
// import { useSelector } from "react-redux";
// import { FacilitiesAddApi, FacilitiesUpdateApi, getHotelByIdApi } from "../../../services/api/hotel/hotelCreateApi";
// import GenralForm from "../../../components/Form/GenricForm/GenralForm";
// import { useLocation } from "react-router-dom";
// import { getFacilityListAPI } from "../../../services/api/facilityCreateApi";

// const FacilitiesForm = forwardRef((props, ref) => {
//   const hotel = useSelector((state) => state.Hotel.data);

//   const hotelFacilities = hotel?.facilities || []; // Ensure hotel.facilities is not null or undefined
//   console.log("hotelFacilities------------------------", hotelFacilities);

//   // Extract only the labels from the hotelFacilities array
//   const labels = hotelFacilities.map(item => item.label);

//   // Convert the labels array into the desired format as a JSON string inside another array
//   const formattedFacilities = JSON.stringify(labels);
//   const facility = [formattedFacilities]

//   console.log("formattedFacilities formattedFacilities ", facility);
//   const location = useLocation();

//   const searchParams = new URLSearchParams(location.search);
//   const id = searchParams.get("id");

//   console.log("hotel hotel hotel hotel hotel", hotel);
//   const [facilities, setFacilities] = useState([]);

//   const fetchFacility = async () => {
//     const res = await getFacilityListAPI();

//     const filteredFacilities = res.facilities.filter(
//       (facility) => !facility.deleted
//     );

//     setFacilities(filteredFacilities);
//   }

//   useEffect(() => {
//     fetchFacility();
//   }, [])

//   const fetchedFacilities = facilities.map((facility) => ({
//     label: facility.facilityName,
//     value: facility.facilityName,
//   }));


//   const [formData, setFormData] = useState({
//     facilities: [],
//   });

//   console.log("formData in facility form", formData);

//   const handleFormChange = (fieldName, value) => {
//     console.log(fieldName, value);
//     setFormData({
//       ...formData,
//       [fieldName]: value,
//     });
//   };



//   useEffect(() => {
//     console.log("id is here", id)
//     const fetchData = () => {
//       const hotelFacilities = hotel?.facilities || []; // Ensure hotel.facilities is not null or undefined
//       // Extract only the labels from the hotelFacilities array
//       const labels = hotelFacilities.map(item => item.label);
//       // Convert the labels array into the desired format as a JSON string inside another array
//       const formattedFacilities = JSON?.stringify(labels);
//       // Update formData with the formatted facilities
//       setFormData(prevData => ({
//         ...prevData,
//         facilities: [formattedFacilities]
//       }));
//     }
//     fetchData();
//   }, [hotel]);


//   const formFields = {
//     form: [
//       { fieldName: "facilities", label: "Facilities", type: "multiselect", errorMessage: "Select Facilities", value: formData.facilities, placeholder: "Select Facilities", isMulti: true, options: fetchedFacilities, defaultValue: hotelFacilities },
//       // { fieldName: "facilities", label: "Facilities", type: "multiselect", errorMessage: "Select Facilities", value: formData.facilities, placeholder: "Select Facilities", isMulti: true, options: fetchedFacilities, defaultValue: hotel?.facilities, },
//     ],
//   };


//   const submitForm = async () => {
//     // Check if at least one facility is selected
//     if (formData.facilities.length === 0) {
//       toastr.error("Please select at least one facility");
//       return;
//     }
//     try {
//       const res = await FacilitiesUpdateApi(formData, id);
//       console.log(res);
//       if (res.status === 200) {
//         toastr.success(res.data.message);
//       } else {
//         toastr.error("something went wrong!");
//       }
//     } catch (error) {
//       console.error(error);
//       toastr.error("Failed to create Property Rules");
//     }
//   };

//   useImperativeHandle(ref, () => ({
//     submitForm,
//   }));

//   return (
//     <div>
//       <Container fluid={true}>
//         <GenralForm formFields={formFields} onChange={handleFormChange} />
//       </Container>
//     </div>
//   );
// });

// export default FacilitiesForm;