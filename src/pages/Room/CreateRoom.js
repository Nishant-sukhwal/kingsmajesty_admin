import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Container } from "reactstrap";
import GenralForm from "../../components/Form/GenricForm/GenralForm";

const CreateRoom = () => {
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({
    hotel: "",
    category: "",
  });
  console.log(formData);

  const handleFormChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(
          "http://localhost:8086/v1/ht/hotels/get-hotels"
        );
        const data = await response.json();
        setHotels(data.hotels);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };

    fetchHotels();
  }, []);
  console.log(hotels);

  const hotelsList = hotels.map((hotel) => ({
    value: hotel.name,
    label: hotel.name,
  }));

  const formFields = {
    backbutton: "/roomcategory",
    form: [
      {
        fieldName: "hotel",
        label: "Hotel",
        type: "select",
        errorMessage: "Please Select Hotel",
        value: formData.hotel,
        options: hotelsList,
      },
      {
        fieldName: "category",
        label: "Room Category Name",
        type: "text",
        errorMessage: "Enter Room Category Name",
        value: "",
        placeholder: "Enter Room Category Name eg: Delux,SuperDelux...",
      },
    ],
  };

  const handleSubmit = () => {};
  return (
    <div className="page-content">
      <Container fluid={true}>
        <Card>
          <CardBody>
            <GenralForm formFields={formFields} onChange={handleFormChange} />
            <Button color="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default CreateRoom;
