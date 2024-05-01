import React, { useEffect, useState } from 'react'
import GenralForm from '../../components/Form/GenricForm/GenralForm'
import { Button, Card, CardBody, Container } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { saveRoomCategoryReq } from '../../store/roomCategory/actions'
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import SubHeader from '../../components/Common/SubHeader'

const CreateTeamForm = () => {
  // const [hotels, setHotels] = useState([]);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: '',
  });
  console.log(formData);

  // useEffect(() => {
  //   const fetchHotels = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:8086/v1/ht/hotels/get-hotels"
  //       );
  //       const data = await response.json();
  //       setHotels(data.hotels);
  //     } catch (error) {
  //       console.error("Error fetching facilities:", error);
  //     }
  //   };

  //   fetchHotels();
  // }, []);
  // console.log(hotels);


  // Dynamically generate options based on the hotels data
  // const options = hotels.map(hotel => ({
  //   value: hotel.name,
  //   label: hotel.name,
  // }));


  const handleFormChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const Roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'super_admin', label: 'Super Admin' },
    { value: 'hotel_manager', label: 'Hotel Manager' },
    { value: 'front_desk_staff', label: 'Front Desk Staff' },
    { value: 'housekeeping_staff', label: 'Housekeeping Staff' },
    { value: 'maintenance_staff', label: 'Maintenance Staff' },
    { value: 'accountant', label: 'Accountant' },
    // Add more roles as needed
  ];
  const formFields = {
    backbutton: '/team',
    form: [
      { fieldName: 'fname',label: 'First Name',type: 'text',errorMessage: 'Enter First Name',value: '',placeholder: 'Enter First Name'},
      { fieldName: 'lname',label: 'Last Name',type: 'text',errorMessage: 'EnterLast Name',value: '',placeholder: 'Enter Last Name'},
      { fieldName: "email", label: "Email", type: 'email', required: true, errorMessage: "Please Enter Email", placeholder: "Enter Email Address" },
      { fieldName: "mobile", label: "Mobile", type: 'number', required: true, errorMessage: "Please Enter Mobile Number", placeholder: "Enter Mobile Number" },
      { fieldName: "hotelCategory", label: "Hotel Category", type: "select", errorMessage: "Please Select Hotel Cetegory", placeholder: "Select Hotel Cetegory", isMulti: false, options: Roles },
    ]
  }

  const handleSubmit = () => {
    dispatch(saveRoomCategoryReq(formData));
    toastr.success("Category Saved Successfully!");
  }

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Card>
          <CardBody>
          <SubHeader value={"/team"} />
            <GenralForm formFields={formFields} onChange={handleFormChange} />
            <Button color="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

export default CreateTeamForm;