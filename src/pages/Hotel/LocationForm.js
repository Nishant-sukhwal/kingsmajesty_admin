
import React, { useEffect, useState } from "react";
import { Row, Col, Form, InputGroup, InputGroupAddon, Input, Label } from "reactstrap";
import { SearchInput, TextInput } from "../../components/Form/FormComponents";

const LocationForm = () => {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [locationDetails, setLocationDetails] = useState({
    country: "",
    state: "",
    city: "",
    zipcode: "",
    lat: "",
    long: "",
  });

  

  useEffect(() => {
    // Load the Google Maps Places API script dynamically
    const googlePlacesScript = document.createElement("script");
    googlePlacesScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA3BYK_Siw8ebziSskitaA5YMjbvcO6n4U&libraries=places`;
    googlePlacesScript.async = true;
    window.document.body.appendChild(googlePlacesScript);

    googlePlacesScript.addEventListener("load", () => {
      console.log("Google Places API script loaded");
    });

    return () => {
      googlePlacesScript.removeEventListener("load", () => {});
      window.document.body.removeChild(googlePlacesScript);
    };
  }, []);

  useEffect(() => {
    if (selectedPlace) {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
      service.getDetails({ placeId: selectedPlace.place_id }, (placeDetails, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const addressComponents = placeDetails.address_components;
          const geometry = placeDetails.geometry.location;

          setLocationDetails({
            country: getAddressComponent("country", addressComponents),
            state: getAddressComponent("administrative_area_level_1", addressComponents),
            city: getAddressComponent("locality", addressComponents),
            zipcode: getAddressComponent("postal_code", addressComponents),
            lat: geometry.lat(),
            long: geometry.lng(),
          });
        }
      });
    }
  }, [selectedPlace]);

  const getAddressComponent = (type, components) => {
    const component = components.find((comp) => comp.types.includes(type));
    return component ? component.long_name : "";
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
    if (event.target.value) {
      getPlacePredictions(event.target.value);
    } else {
      setPredictions([]);
    }
  };

  const getPlacePredictions = (input) => {
    if (window.google) {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input }, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPredictions(predictions);
        }
      });
    }
  };

  const handleSelectPrediction = (prediction) => {
    setQuery(prediction.description);
    setSelectedPlace(prediction);
    setPredictions([]); // Close the predictions dropdown
  };


  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        !e.target.closest(".predictions-dropdown") &&
        predictions.length > 0
      ) {
        setPredictions([]);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [predictions]);


  
  
  return (
    <Form>
      <Row className="mb-3 d-flex">
        <Label className="col-1 col-form-label" >Address</Label>
        <Col >
          <InputGroup >
            <Input
              type="search"
              rows='2'
              placeholder="Search for a place..."
              value={query}
              onChange={handleChange}
              
            />
            {predictions.length > 0 && (
              <InputGroup addonType="append">
                <ul className="predictions-dropdown">
                  {predictions.map((prediction) => (
                    <li
                      key={prediction.place_id}
                      onClick={() => handleSelectPrediction(prediction)}
                    >
                      {prediction.description}
                    </li>
                  ))}
                </ul>
              </InputGroup>
            )}
          </InputGroup>
        </Col>
      </Row>

     
 
      

      <Row>
        <Col lg="6">
          <TextInput
            label="Country"
            id="country-input"
            defaultValue={locationDetails.country}
            value={locationDetails.country}
            onChange={(e) => setLocationDetails({ ...locationDetails, country: e.target.value })}
            placeholder="Enter Country"
          />
        </Col>
        <Col lg="6">
          <TextInput
            label="State"
            id="state-input"
            defaultValue={locationDetails.state}
            value={locationDetails.state}
            onChange={(e) => setLocationDetails({ ...locationDetails, state: e.target.value })}
            placeholder="Enter State"
          />
        </Col>
      </Row>

      <Row>
        <Col lg="6">
          <TextInput
            label="City"
            id="title-input"
            defaultValue={locationDetails.city}
            value={locationDetails.city}
            onChange={(e) => setLocationDetails({ ...locationDetails, city: e.target.value })}
            placeholder="Enter City Name"
          />
        </Col>
        <Col lg="6">
          <TextInput
            label="Zipcode"
            id="zipcode-input"
            defaultValue={locationDetails.zipcode}
            value={locationDetails.zipcode}
            onChange={(e) => setLocationDetails({ ...locationDetails, zipcode: e.target.value })}
            placeholder="Enter Zipcode"
          />
        </Col>
      </Row>

      <Row>
        <Col lg="6">
          <TextInput
            label="Latitude"
            id="latitude-input"
            defaultValue={locationDetails.lat}
            value={locationDetails.latitude}
            onChange={(e) => setLocationDetails({ ...locationDetails, latitude: e.target.value })}
            placeholder="EnterLatitude"
          />
        </Col>
        <Col lg="6">
          <TextInput
            label="Longitude"
            id="longitude-input"
            defaultValue={locationDetails.long}
            value={locationDetails.longitude}
            onChange={(e) => setLocationDetails({ ...locationDetails, longitude: e.target.value })}
            placeholder="Enter Longitude"
          />
        </Col>
      </Row>
    </Form>
  );
};

export default LocationForm;


// import React, { useEffect, useState } from "react";
// import { Row, Col, Label, Input, Form, InputGroup } from "reactstrap";
// // import AddressInput from "../../components/Form/FormComponents/AddressInput";
// import { SelectInput, TextInput } from "../../components/Form/FormComponents";

// const LocationForm = () => {

//   const [query, setQuery] = useState("");
//   const [predictions, setPredictions] = useState([]);
//   const [selectedPlace, setSelectedPlace] = useState(null);
//   const [locationDetails, setLocationDetails] = useState({
//     country: "",
//     state: "",
//     city: "",
//     zipcode: "",
//     lat: "",
//     long: "",
//   });
//   // const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     // Load the Google Maps Places API script dynamically
//     const googlePlacesScript = document.createElement("script");
//     googlePlacesScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA3BYK_Siw8ebziSskitaA5YMjbvcO6n4U&libraries=places`;
//     googlePlacesScript.async = true;
//     window.document.body.appendChild(googlePlacesScript);

//     googlePlacesScript.addEventListener("load", () => {
//       // The Google Places API script has loaded, you can start using it here
//       console.log("Google Places API script loaded");
//     });

//     return () => {
//       // Clean up to remove the script when the component unmounts
//       googlePlacesScript.removeEventListener("load", () => {});
//       window.document.body.removeChild(googlePlacesScript);
//     };
//   }, []); // Empty dependency array ensures this effect runs only once on mount

//   useEffect(() => {
//     if (selectedPlace) {
//       // Fetch additional details using the Place Details API
//       const service = new window.google.maps.places.PlacesService(
//         document.createElement("div")
//       );
//       service.getDetails(
//         { placeId: selectedPlace.place_id },
//         (placeDetails, status) => {
//           if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//             // Extract relevant information from placeDetails
//             const addressComponents = placeDetails.address_components;
//             const geometry = placeDetails.geometry.location;

//             // Update locationDetails state
//             setLocationDetails({
//               country: getAddressComponent("country", addressComponents),
//               state: getAddressComponent(
//                 "administrative_area_level_1",
//                 addressComponents
//               ),
//               city: getAddressComponent("locality", addressComponents),
//               zipcode: getAddressComponent("postal_code", addressComponents),
//               lat: geometry.lat(),
//               long: geometry.lng(),
//             });
//           }
//         }
//       );
//     }
//   }, [selectedPlace]);

//   const getAddressComponent = (type, components) => {
//     const component = components.find((comp) => comp.types.includes(type));
//     return component ? component.long_name : "";
//   };

//   const handleChange = (event) => {
//     setQuery(event.target.value);
//     if (event.target.value) {
//       getPlacePredictions(event.target.value);
//     } else {
//       setPredictions([]);
//     }
//   };

//   const getPlacePredictions = (input) => {
//     // Check if google is available on the window object
//     if (window.google) {
//       const service = new window.google.maps.places.AutocompleteService();
//       service.getPlacePredictions({ input }, (predictions, status) => {
//         if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//           setPredictions(predictions);
//         }
//       });
//     }
//   };

//   const handleSelectPrediction = (prediction) => {
//     setQuery(prediction.description);
//     setSelectedPlace(prediction);
//   };

//   const handleAddToDatabase = () => {
//     // Here you can implement the logic to add locationDetails to your database
//     console.log("Adding to database:", locationDetails);
//     // Example: You can use a backend API to add data to your database
//     // fetch('/api/addLocation', {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     //   body: JSON.stringify(locationDetails),
//     // })
//     //   .then(response => response.json())
//     //   .then(data => console.log('Data added to database:', data))
//     //   .catch(error => console.error('Error adding data to database:', error));
//   };
 
//   const handleInputChange = (event, field) => {
//     const { value } = event.target;
//     setLocationDetails((prevData) => ({ ...prevData, [field]: value }));
//   };


  
//     // const [formData, setFormData] = useState({
//     //     country: "",
//     //     state: "",
//     //   });
    
//       // const handleInputChange = (event, field) => {
//       //   const { value } = event.target;
//       //   setFormData((prevData) => ({ ...prevData, [field]: value }));
//       // };
//   return (
//     <Form>
//       <Row>
//       <InputGroup>
//             <Input
//               type="text"
//               placeholder="Search for a place..."
//               value={query}
//               onChange={handleChange}
//             />
//             {predictions.length > 0 && (
//               <InputGroup addonType="append">
//                 <ul className="predictions-dropdown">
//                   {predictions.map((prediction) => (
//                     <li
//                       key={prediction.place_id}
//                       onClick={() => handleSelectPrediction(prediction)}
//                     >
//                       {prediction.description}
//                     </li>
//                   ))}
//                 </ul>
//               </InputGroup>
//             )}
//           </InputGroup>
//       </Row>
//       <Row>
//         <Col lg="6">
//           {/* Country */}
//           <TextInput
//             label="Country"
//             id="country-input"
//             value={locationDetails.country}
//             onChange={(e) => handleInputChange(e, "country")}
//             placeholder="Enter Country"
//           />
//         </Col>

//         <Col lg="6">
//           {/* State */}
//           <TextInput
//             label="State"
//             id="state-input"
//             value={locationDetails.state}
//             onChange={(e) => handleInputChange(e, "state")}
//             placeholder="Enter State"
//           />
//         </Col>
//       </Row>

//       <Row>
//         <Col lg="6">
//           {/* City */}
//           <TextInput
//             label="City"
//             id="title-input"
//             value={locationDetails.city}
//             onChange={(e) => handleInputChange(e, "city")}
//             placeholder="Enter City Name"
//           />
//         </Col>

//         <Col lg="6">
//           {/* Zipcode */}
//           <TextInput
//             label="Zipcode"
//             id="zipcode-input"
//             value={locationDetails.zipcode}
//             onChange={(e) => handleInputChange(e, "zipcode")}
//             placeholder="Enter Zipcode"
//           />
//         </Col>
//       </Row>
//     </Form>
//   );
// };

// export default LocationForm;


// import React, { useState } from "react";
// import { Row, Col, Label, Input, Form } from "reactstrap";
// import AddressInput from "../../components/Form/FormComponents/AddressInput";
// import { TextInput } from "../../components/Form/FormComponents";

// const LocationForm = () => {
//     const [formData, setFormData] = useState({
//         country: "",
//         state: "",
//       });
    
//       const handleInputChange = (event, field) => {
//         const { value } = event.target;
//         setFormData((prevData) => ({ ...prevData, [field]: value }));
//       };
//   return (
//     <Form>
//       <Row>
//         <AddressInput label="Address" id="basicpill-address-input1" />
//       </Row>

//       <Row>
//         <Col lg="6">
//           {/* Country */}
//           <TextInput
//             label="Country"
//             id="country-input"
//             value={formData.country}
//             onChange={(e) => handleInputChange(e, "title")}
//             placeholder="Enter Country"
//           />
//         </Col>

//         <Col lg="6">
//           {/* State */}
//           <TextInput
//             label="State"
//             id="state-input"
//             value={formData.state}
//             onChange={(e) => handleInputChange(e, "subtitle")}
//             placeholder="Enter State"
//           />
//         </Col>
//       </Row>

//       <Row>
//         <Col lg="6">
//           {/* City */}
//           <TextInput
//             label="City"
//             id="title-input"
//             value={formData.title}
//             onChange={(e) => handleInputChange(e, "title")}
//             placeholder="Enter City Name"
//           />
//         </Col>

//         <Col lg="6">
//           {/* Zipcode */}
//           <TextInput
//             label="Zipcode"
//             id="zipcode-input"
//             value={formData.tag}
//             onChange={(e) => handleInputChange(e, "subtitle")}
//             placeholder="Enter Zipcode"
//           />
//         </Col>
//       </Row>
//     </Form>
//   );
// };

// export default LocationForm;
