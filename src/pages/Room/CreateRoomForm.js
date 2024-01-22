import React, { useState } from 'react'
import GenricForm from '../../components/Form/GenricForm/GenricForm'
import {  Button, Card, CardBody, Col, Container, Row } from 'reactstrap'
import { ChooseFileInput } from '../../components/Form/FormComponents';
import ImageViewer from '../../components/Form/FormComponents/ImageViewer';
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const CreateRoomForm = () => {

  const [formData, setFormData] = useState({
    HotelCategory: '',
    RoomCategory:'',
    baseprice: '',
    todaysprice: '',
    minpeople: '',
    maxadults: '',
    maxchild: '',
    stocks: '',
    Facilities: '',
    Deals: '',
    description: '',
    thumbnail: null, 
  });
  console.log(formData);

  const handleFormChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async () => {
    try {
      // Create FormData object to append files
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'gallery') {
          value.forEach((file, index) => {
            formDataToSend.append(`gallery[${index}]`, file);
          });
        } else if (key === 'thumbnail') {
          formDataToSend.append('thumbnail', value);
        } else {
          formDataToSend.append(key, value);
        }
      });
      
      console.log([...formDataToSend]); 
      // Send POST request to your API endpoint
      const response = await fetch('http://localhost:8086/v1/rm/rooms/add-room', {
        method: 'POST',
        body: formDataToSend,
      });
      console.log(response,'Form data submitted successfully');
      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        toastr.success('Room added successfully!');
        // console.log(response,'Form data submitted successfully');
      } else {
        // Handle error, e.g., show an error message
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('An error occurred while submitting form data', error);
    }
  };


    const formFields = {
              backToList: '/rooms',
              form: [
                {
                name: "Hotel",
                label: "HotelCategory",
                value: '',
                type: "select",
                options: [
                  { value: "JagatNiwas", label: "JagatNiwas" },
                  { value: "Annta", label: "Annta" },
                  { value: "Jaydurg", label: "Jaydurg" },
                  { value: "Other", label: "Other" },
                ],
                required: true,
              },
              {
                name: "Room",
                label: "RoomCategory",
                value: '',
                type: "select",
                options: [
                  { value: "Delux", label: "Delux" },
                  { value: "Super Delux", label: "Super Delux" },
                  { value: "Premium", label: "Premium" },
                  { value: "Other", label: "Other" },
                ],
                required: true,
              },
              {name: "baseprice", label: 'Base Price', value: '', type: 'number'},
              {name: "todaysprice", label: 'Todays Price', value: '', type: 'number'},
              {name: "minpeople", label: 'Min People', value: '', type: 'number'},
              {name: "maxadults", label: 'Max Adults', value: '', type: 'number'},
              {name: "maxchild", label: 'Max Children', value: '', type: 'number'},
              { name: "stocks", label: "Room Stock", type: 'number', },
              {
                name: "facilities",
                label: "Facilities",
                value: '',
                type: "select",
                options: [
                  { value: "TV", label: "TV" },
                  { value: "AC", label: "AC" },
                  { value: "Desk", label: "Desk" },
                  { value: "Other", label: "Other" },
                ],
                required: true,
              },
              {
                name: "deals",
                label: "Deals",
                value: '',
                type: "select",
                options: [
                  { value: "50%OFF", label: "50%OFF" },
                  { value: "Latest", label: "Latest" },
                  { value: "Limited Time Deal", label: "Limited Time Deal" },
                ],
                required: true,
              },
              {name: "description", label: 'Description', value: formData.description, type: 'ckeditor' ,onChange: (name, value) => handleFormChange(name, value)},
            //   { name: "stocks", label: "Room Stock", type: 'radio', },
            ]
            }           
  return (
    <div className="page-content">
     <Container fluid={true}>
      <Card> 
        <CardBody>
        <GenricForm formfields={formFields}  onChange={handleFormChange}/>  
        <Button color="primary" type="submit" onClick={handleSubmit}>
           Submit
        </Button>
        </CardBody>
         </Card>
       
     </Container>
    </div>
  )
}

export default CreateRoomForm



// import { AvForm } from 'availity-reactstrap-validation';
// import React, { useState } from 'react'

// import {
//     Row,
//     Col,
//     Form,
//     Card,
//     CardBody,
//     Container,
//     Button,
//   } from "reactstrap";
// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import toastr from 'toastr'
// import 'toastr/build/toastr.min.css'
// import GenericFormAvfield from "../../components/Form/GenricForm/GenricFormAvfield";
// import SubHeader from "../../components/Common/SubHeader";


// const CreateRoomForm = () => {

//     const [formData, setFormData] = useState({
//         name: "",
//         media: null,
//       });

//     const [breadcrumbItems] = useState([
//         { title: "KingMajesty", link: "/" },
//         { title: "Create Room", link: "#" },
//     ]);

//     console.log(formData);

//     const formFields = [
//       {
//         name: "Hotel",
//         label: "Hotel",
//         value: formData.hotelCategory,
//         type: "select",
//         options: [
//           { value: "JagatNiwas", label: "JagatNiwas" },
//           { value: "Annta", label: "Annta" },
//           { value: "Jaydurg", label: "Jaydurg" },
//           { value: "Other", label: "Other" },
//         ],
//         required: true,
//       },
//       {
//         name: "Room Category",
//         label: "Room Category",
//         value: formData.hotelCategory,
//         type: "select",
//         options: [
//           { value: "Delux", label: "Delux" },
//           { value: "SuperDelux", label: "SuperDelux" },
//           { value: "Premium", label: "Premium" },
//           { value: "LakeView", label: "LakeView" },
//         ],
//         required: true,
//       },
//       { name: "subtitle", label: "Subtitle", required: true },
//       { name: "baseprice", label: "BasePrice",type: 'number', required: true },
//       { name: "todaysprice", label: "Today'sPrice",type: 'number', required: true },
//       { name: "max_child", label: "Max Children",type: 'number', required: true },
//       { name: "max_adults", label: "Max Adults",type: 'number', required: true },
//       { name: "max_people", label: "Max People", type: 'number',required: true },
//       { name: "min_people", label: "Min People",type: 'number', required: true },
//       { name: "stocks", label: "Room Stock",type: 'number', required: true },
//       {
//         name: "facilities",
//         label: "Facilities",
//         value: formData.hotelCategory,
//         type: "select",
//         options: [
//           { value: "TV", label: "TV" },
//           { value: "AC", label: "AC" },
//           { value: "Desk", label: "Desk" },
//           { value: "Other", label: "Other" },
//         ],
//         required: true,
//       },
//       { name: "description", label: "Description", type: "ckeditor" },
      
//     ]

//     // const handleSubmit = async (event, errors, values) => {
//     //     event.preventDefault();

//     //     if (errors.length === 0) {
//     //         try {
//     //             await facilityCreateApi(formData);
//     //             toastr.success("Facility created successfully");
//     //         } catch (error) {
//     //             console.error(error);
//     //             toastr.error("Failed to create facility");
//     //         }
//     //     } else {
//     //         // Handle validation errors (e.g., display an error message)
//     //         toastr.error("Please fill in all required fields");
//     //     }
//     // };

   

//     const handleInputChange = (event, field, value) => {
//         if (field === "media") {
//             setFormData((prevData) => ({ ...prevData, [field]: event.target.files[0] }));
//         } else {
//             setFormData((prevData) => ({ ...prevData, [field]: value || event.target.value }));
//         }
//     };

//     return (
//         <div className="page-content">
//             <Container fluid={true}>
//                 <Breadcrumbs
//                     title="Create Room"
//                     breadcrumbItems={breadcrumbItems}
//                 />
//                 <Card>
//                     <CardBody>
//                         <SubHeader value={'/rooms'} />
//                         <AvForm >
//                             <GenericFormAvfield fields={formFields}   onInputChange={handleInputChange} />
//                             <Button color="primary" type="submit">
//                                 Submit
//                             </Button>
//                         </AvForm>
//                     </CardBody>
//                 </Card>
//             </Container>
//         </div>
//     )
// }

// export default CreateRoomForm