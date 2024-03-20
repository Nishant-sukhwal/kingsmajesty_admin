import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Container } from "reactstrap";
import GenralForm from "../../components/Form/GenricForm/GenralForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHotelDropdownOptions,
  getCategories,
  getDeals,
  getFacilityList,
  saveRoom,
} from "../../store/actions";
import SubHeader from "../../components/Common/SubHeader";

const CreateRoom = () => {
  const dispatch = useDispatch();
  const [
    hotelDropdownOptions,
    categories,
    facilitiesDropdownOptions,
    DealsDropdownOptions,
  ] = useSelector((state) => [
    state.Room.hotelDropdownOptions.hotels,
    state.RoomCategory.category,
    state.Facility.facilities,
    state.Deals.deals,
  ]);

  const [formData, setFormData] = useState({
    hotel: "",
    category: "",
    facilities: [],
    deals: [],
    gallery: [],
    thumbnail: "",
    description: "",
    min_people: "",
    max_adults: "",
    base_Price: "",
    todays_price: "",
    max_children: "",
    rooms_stock: "",
  });
  console.log(formData);

  const handleFormChange = (fieldName, value) => {
    console.log(fieldName, value);
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  useEffect(() => {
    dispatch(fetchHotelDropdownOptions());
    dispatch(getCategories());
    dispatch(getFacilityList());
    dispatch(getDeals());
  }, []);

  const [
    hotelsListOption,
    roomCategoryOptions,
    facilitiesOptions,
    dealsOptions,
  ] = [
      hotelDropdownOptions?.map((hotel) => ({
        value: hotel.name,
        label: hotel.name,
      })),
      categories?.map((category) => ({
        value: category.category,
        label: category.category,
      })),
      facilitiesDropdownOptions?.map((facilities) => ({
        value: facilities.facilityName,
        label: facilities.facilityName,
      })),
      DealsDropdownOptions?.map((deals) => ({
        value: deals.name,
        label: deals.name,
      })),
    ];

  const formFields = {
    backbutton: "/rooms",
    form: [
      {
        fieldName: "hotel",
        label: "Hotel",
        type: "select",
        errorMessage: "Please Select Hotel",
        value: formData.hotel,
        options: hotelsListOption,
      },
      {
        fieldName: "category",
        label: "Room Category",
        type: "select",
        errorMessage: "Select Room Category Name",
        value: formData.category,
        placeholder: "Select Room Category Name eg: Delux,SuperDelux...",
        options: roomCategoryOptions,
      },
      {
        fieldName: "min_people",
        label: "Min People",
        type: "number",
        errorMessage: "Enter Minimum People",
        placeholder: "Enter Minimum Number of People in Room",
        value: "",
      },
      {
        fieldName: "max_adults",
        label: "Max Adults",
        type: "number",
        errorMessage: "Enter Max Adults",
        placeholder: "Enter Maximum Number of Adults in Room",
        value: "",
      },
      {
        fieldName: "base_Price",
        label: "Base Price",
        type: "number",
        errorMessage: "Enter Base Price",
        placeholder: "Enter Base Price",
        value: "",
      },
      {
        fieldName: "todays_price",
        label: "Todays Price",
        type: "number",
        errorMessage: "Enter Todays Price",
        placeholder: "Enter Todays Price",
        value: "",
      },
      {
        fieldName: "max_children",
        label: "Max Children",
        type: "number",
        errorMessage: "Enter Max. Children in Room",
        placeholder: "Enter Max. Children in Room",
        value: "",
      },
      {
        fieldName: "rooms_stock",
        label: "Rooms Stock",
        type: "number",
        errorMessage: "Enter Number of Rooms Available in stock ",
        placeholder: "Enter Number of Rooms in stock",
        value: "",
      },
      {
        fieldName: "facilities",
        label: "Facilities",
        type: "select",
        errorMessage: "Select Facilities For Room",
        value: formData.facilities,
        placeholder: "Select Facilities For Room eg: TV,AC,WiFi...",
        isMulti: true,
        options: facilitiesOptions,
      },
      {
        fieldName: "deals",
        label: "Deals",
        type: "select",
        errorMessage: "Select Deals For Room",
        // value: formData.facilities,
        placeholder: "Select Deals For Room",
        isMulti: true,
        options: dealsOptions,
      },
      {
        fieldName: "thumbnail",
        label: "Thumbnail",
        type: "file",
        errorMessage: "Select File",
        value: formData.thumbnail,
        placeholder: "Select Image...",
        imageViewer: true, // Enable image viewer for this field
      },
      {
        fieldName: "gallery",
        label: "Gallery",
        type: "file",
        errorMessage: "Select File",
        placeholder: "Select Image...",
        value: formData.gallery,
        multiple: true,
        imageViewer: true, // Enable image viewer for this field
      },
      {
        fieldName: "description",
        label: "Description",
        type: "editor",
      },
    ],
  };

  const handleSubmit = async () => {
    dispatch(saveRoom(formData));
  };

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Card>
          <CardBody>
            <SubHeader value="/rooms" />
            <GenralForm formFields={formFields} onChange={handleFormChange} />
            <Button color="primary" type="submit" onClick={handleSubmit}>Submit</Button>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default CreateRoom;
