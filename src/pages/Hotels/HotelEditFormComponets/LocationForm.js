import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import GenericFormAvfield from "../../../components/Form/GenricForm/GenricFormAvfield";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { AddLocationInfoApi } from "../../../services/api/hotel/hotelCreateApi";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import GenralForm from "../../../components/Form/GenricForm/GenralForm";
import { useLocation } from "react-router-dom";

const LocationForm = forwardRef((props, ref) => {
  const hotelId = useSelector((state) => state.Hotel.id);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestedAddresses, setSuggestedAddresses] = useState([]);
  const hotel = useSelector((state) => state.Hotel.data);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id")


  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState({
    country: "",
    state: "",
    city: "",
    zipcode: "",
    latitude: "",
    longitude: "",
  });
  const [formData, setFormData] = useState({
    address: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    latitude: "",
    longitude: "",
  });
  console.log("formData in location form", formData);


  const handleFormChange = (fieldName, value) => {
    console.log(fieldName, value);
    setFormData(formData => ({
      ...formData,
      [fieldName]: value,
    }));
  };


  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      address: hotel?.address,
      country: hotel?.country,
      state: hotel?.state,
      city: hotel?.city,
      zipcode: hotel?.zipcode,
      latitude: hotel?.latitude,
      longitude: hotel?.longitude,
    }))
    setSearchTerm(hotel?.address)
  }, [hotel, id])


  useEffect(() => {
    // Load the Google Maps Places API script dynamically
    if (!window.google || !window.google.maps) {
      const googlePlacesScript = document.createElement("script");
      googlePlacesScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA3BYK_Siw8ebziSskitaA5YMjbvcO6n4U&libraries=places`;
      googlePlacesScript.async = true;

      // Event listener for script load
      googlePlacesScript.addEventListener("load", () => {
        console.log("Google Places API script loaded");
      });

      // Append the script to the document
      document.body.appendChild(googlePlacesScript);

      // Cleanup function to remove the script on component unmount
      return () => {
        document.body.removeChild(googlePlacesScript);
      };
    }
  }, []);


  const handleInputChange = (event, field) => {
    const value = event.target.value;

    if (field === "address" && !value.trim()) {
      // If address field is empty, reset formData
      setFormData(prevData => ({
        ...prevData,
        address: "",
        country: "",
        state: "",
        city: "",
        zipcode: "",
        latitude: "",
        longitude: "",
      }));

      setSuggestedAddresses([]); // Clear suggestions
    } else {
      // If address field is not empty, update formData
      setFormData((prevData) => ({
        ...prevData,
        [field]: value || event.target.value,
      }));

      const autocompleteService =
        new window.google.maps.places.AutocompleteService();

      autocompleteService.getPlacePredictions(
        { input: value },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setSuggestedAddresses(
              predictions.map((prediction) => prediction.description)
            );
          } else {
            setSuggestedAddresses([]);
          }
        }
      );
    }
  };

  const handleAddressSelect = (event) => {
    const selectedAddress = event.target.value;

    // Check if the selected address is from suggestions or manually entered
    const isSuggestedAddress = suggestedAddresses.includes(selectedAddress);

    if (!isSuggestedAddress) {
      // If the address is manually entered, clear other input fields
      setSelectedPlaceDetails({
        country: "",
        state: "",
        city: "",
        zipcode: "",
        latitude: "",
        longitude: "",
      });
    } else {
      // If the address is from suggestions, fetch details from Google Maps
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: selectedAddress }, (results, status) => {
        if (
          status === window.google.maps.GeocoderStatus.OK &&
          results.length > 0
        ) {
          const placeDetails = results[0];
          const addressComponents = placeDetails.address_components;
          const geometry = placeDetails.geometry.location;

          // Update selected place details
          setSelectedPlaceDetails({
            country: getAddressComponent("country", addressComponents),
            state: getAddressComponent(
              "administrative_area_level_1",
              addressComponents
            ),
            city: getAddressComponent("locality", addressComponents),
            zipcode: getAddressComponent("postal_code", addressComponents),
            latitude: geometry.lat(),
            longitude: geometry.lng(),
          });

          setSearchTerm(selectedAddress);

          setFormData(prevData => ({
            ...prevData,
            address: selectedAddress,
            country: getAddressComponent("country", addressComponents),
            state: getAddressComponent(
              "administrative_area_level_1",
              addressComponents
            ),
            city: getAddressComponent("locality", addressComponents),
            zipcode: getAddressComponent("postal_code", addressComponents),
            latitude: geometry.lat(),
            longitude: geometry.lng(),
          }));

          setSuggestedAddresses([]); // Clear suggestions
        }
      });
    }
  };

  const getAddressComponent = (type, components) => {
    const component = components.find((comp) => comp.types.includes(type));
    return component ? component.long_name : "";
  };

  // const formFields = [
  //   { name: "country", label: "Country", type: "text", required: true },
  //   { name: "state", label: "State", type: "text", required: true },
  //   { name: "city", label: "City", type: "text", required: true },
  //   { name: "zipcode", label: "Zipcode", type: "text", required: true },
  //   { name: "latitude", label: "Latitude", type: "text", },
  //   { name: "longitude", label: "Longitude", type: "text", },
  // ];

  const formFields = {
    form: [
      { fieldName: "country", label: "Country", type: "text", required: true, errorMessage: "Please Enter Country", placeholder: "Enter Country", defaultValue: hotel?.country, },
      { fieldName: "state", label: "State", type: "text", required: true, errorMessage: "Please Enter State", placeholder: "Enter State", defaultValue: hotel?.state, },
      { fieldName: "city", label: "City", type: "text", required: true, errorMessage: "Please Enter City", placeholder: "Enter City", defaultValue: hotel?.city, },
      { fieldName: "zipcode", label: "Zipcode", type: "text", required: true, errorMessage: "Please Enter Zipcode", placeholder: "Enter Zipcode", defaultValue: hotel?.zipcode, },
      { fieldName: "latitude", label: "Latitude", type: "text", required: true, errorMessage: "Please Enter Latitude", placeholder: "Enter Latitude", defaultValue: hotel?.latitude, },
      { fieldName: "longitude", label: "Longitude", type: "text", required: true, errorMessage: "Please Enter Longitude", placeholder: "Enter Longitude", defaultValue: hotel?.longitude, },
    ],
  };



  const submitForm = async () => {
    // Check if all required fields are filled
    const errors = {};
    formFields.form.forEach(field => {
      if (field.required && !formData[field.fieldName]) {
        errors[field.fieldName] = field.label;
      }
    });
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join(" ,");
      toastr.error(`Please ensure all required fields are filled. Missing fields: : ${errorMessages}`);
      return;
    }

    try {
      const res = await AddLocationInfoApi(formData, hotelId);
      if (res.status === 200) {
        toastr.success(res.data.message);
        if (props.onSubmitSuccess) {
          props.onSubmitSuccess();
        }
      } else {
        if (props.onSubmitSuccess) {
          props.onSubmitSuccess();
        }
      }

    } catch (error) {
      console.error(error);
      toastr.error("Failed to create Hotel");
    }
  };

  useImperativeHandle(ref, () => ({
    submitForm,
  }));

  return (
    <div>
      <Container fluid={true}>
        <div class="row">
          <div class="col-md-1">
            <label for="address">Address</label>
          </div>
          <div class="col-md-11">
            <AvForm>
              <AvField
                name="address"
                id="address"
                type="search"
                value={searchTerm}
                onChange={(e) => {
                  handleInputChange(e, "address");
                  handleAddressSelect(e);
                }}
                placeholder="Type an address..."
                list="suggestedAddresses"
                required
              />
              {/* Display suggested addresses */}
              <datalist id="suggestedAddresses">
                {suggestedAddresses.map((address) => (
                  <option key={address} value={address} />
                ))}
              </datalist>
            </AvForm>
          </div>
        </div>
        <GenralForm formFields={formFields} onChange={handleFormChange} prefilledDetails={selectedPlaceDetails} />
      </Container>
    </div>
  );
});

export default LocationForm;














