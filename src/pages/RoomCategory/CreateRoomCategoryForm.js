import React, { useEffect, useState } from 'react'
import GenralForm from '../../components/Form/GenricForm/GenralForm'
import { Button, Card, CardBody, Container } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { saveRoomCategoryReq } from '../../store/roomCategory/actions'
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const CreateRoomCategoryForm = () => {
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

  const formFields = {
    backbutton: '/roomcategory',
    form: [
      // {
      //   fieldName: 'hotel',
      //   label: 'Hotel',
      //   type: 'select',
      //   errorMessage: 'Please Select Hotel',
      //   value: formData.hotel,
      //   options: options,
      // },
      {
        fieldName: 'name',
        label: 'Room Category Name',
        type: 'text',
        errorMessage: 'Enter Room Category Name',
        value: '',
        placeholder: 'Enter Room Category Name eg: Delux,SuperDelux...'
      }
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

export default CreateRoomCategoryForm

// import React, { useEffect, useState } from "react";
// import {
//   Row,
//   Col,
//   Form,
//   Card,
//   CardBody,
//   Container,
//   Button,
// } from "reactstrap";
// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import { AvForm } from "availity-reactstrap-validation";
// import { facilityCreateApi } from "../../services/api/facility/facilityCreateApi";
// import toastr from 'toastr'
// import 'toastr/build/toastr.min.css'

// import GenericFormAvfield from "../../components/Form/GenricForm/GenricFormAvfield";
// import SubHeader from "../../components/Common/SubHeader";

// const CreateRoomCategoryForm = () => {

//   const [formData, setFormData] = useState({
//     name: "",
//     media: null,
//   });

//   console.log(formData);

//   const formFields = [
//     { name: "name", label: "Name", required: true },
//     {
//       name: "media",
//       label: "Media File",
//       type: "file",
//       accept: "image/*, video/*",
//       required: true,
//     },
//   ]

//   const [breadcrumbItems] = useState([
//     { title: "KingMajesty", link: "/" },
//     { title: "Create Room Category", link: "#" },
//   ]);

//   const handleSubmit = async (event, errors, values) => {
//     event.preventDefault();

//     if (errors.length === 0) {
//       try {
//         await facilityCreateApi(formData);
//         toastr.success("Facility created successfully");
//       } catch (error) {
//         console.error(error);
//         toastr.error("Failed to create facility");
//       }
//     } else {
//       // Handle validation errors (e.g., display an error message)
//       toastr.error("Please fill in all required fields");
//     }
//   };

//   // const handleInputChange = (event, field, value) => {
//   //   setFormData((prevData) => ({ ...prevData, [field]: value || event.target.value }));
//   // };

//   const handleInputChange = (event, field, value) => {
//     if (field === "media") {
//       setFormData((prevData) => ({ ...prevData, [field]: event.target.files[0] }));
//     } else {
//       setFormData((prevData) => ({ ...prevData, [field]: value || event.target.value }));
//     }
//   };

//   return (
//     <div className="page-content">
//       <Container fluid={true}>
//         <Breadcrumbs
//           title="Create Facilities"
//           breadcrumbItems={breadcrumbItems}
//         />
//         <Card>
//           <CardBody>
//             <SubHeader value={'/facilities'} />
//             <AvForm onSubmit={handleSubmit}>
//               <GenericFormAvfield fields={formFields} onInputChange={handleInputChange} />
//               <Button color="primary" type="submit">
//                 Submit
//               </Button>
//             </AvForm>
//           </CardBody>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// export default CreateRoomCategoryForm;