
import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Card,
  CardBody,
  Container,
  Button,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { AvForm } from "availity-reactstrap-validation";
import ChooseFileInput from "../../components/Form/FormComponents/ChooseFileInput";
import TextInput from "../../components/Form/FormComponentsValidate/TextInput";
import {  facilityUpdateApi } from "../../services/api/facility/facilityCreateApi";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { useLocation, useNavigate } from "react-router-dom";
import SubHeader from "../../components/Common/SubHeader";
import GenericFormAvfield from "../../components/Form/GenricForm/GenricFormAvfield";

const UpdateFacility = () => {
  const [breadcrumbItems] = useState([
    { title: "KingMajesty", link: "/" },
    { title: "Create Facilities", link: "#" },
  ]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const facilityName = searchParams.get("facilityName");
  const image = searchParams.get("image");
  const id = searchParams.get("id")
  console.log(facilityName);
  console.log("id in update ",id);

  // Form data and validation state
  const [formData, setFormData] = useState({
    name: "",
    media: null, // Updated to handle file input
  });

  const [validation, setValidation] = useState({
    facilityName: true,
  });

  // Function to handle form submission
  const handleSubmit = async (e,errors) => {
    
    e.preventDefault();
    if (formData.name !== "") {
     try {
      // Assuming submitFacilityData is an async function that handles the API call
      console.log("Inside Api call");
      const res = await facilityUpdateApi(formData,id);
      console.log(res);
      //Clear form data on successful submission
      setFormData({
        
        media: "" || null,
        name: ""
      });

      toastr.success('Facility updated successfully!', 'Success');

      // Optionally, add any success messages or redirection logic here
     }  catch (error) {
      console.error("Error submitting form:", error);
      toastr.error('An error occurred. Please try again.', 'Error');
      // Handle error (e.g., display an error message)
     }
   }else{
    toastr.error('Fill all the form data.', 'Error');
   }
  };


  const handleInputChange = (event, field, value) => {
    if (field === "media") {
      setFormData((prevData) => ({ ...prevData, [field]: event.target.files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [field]: value || event.target.value }));
    }
  };

  const formFields = [
    { name: "name", label: "Name", required: true },
    {
      name: "media",
      label: "Media File",
      type: "file",
      accept: "image/*, video/*",
      required: true,
    },
  ]


  // const navigate = useNavigate();
  // const handleNavigate = () => {
  //   navigate("/facilities");
  // };
 
  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs
          title="Create Facilities"
          breadcrumbItems={breadcrumbItems}
        />
        <Form>
          <Card>
            <CardBody>
            

              <SubHeader value={'/facilities'} />
              <AvForm >
                 <GenericFormAvfield fields={formFields} onInputChange={handleInputChange} prefilledvalue={facilityName} />

                <Button color="primary" type="submit" onClick={handleSubmit} >
                  Update
                </Button>
              </AvForm>       
            </CardBody>
          </Card>
        </Form>
      </Container>
    </div>
  );
};

export default UpdateFacility;

// import React, { useState } from "react";
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
// import ChooseFileInput from "../../components/Form/FormComponents/ChooseFileInput";
// import TextInput from "../../components/Form/FormComponentsValidate/TextInput";
// import {  facilityUpdateApi } from "../../services/api/facility/facilityCreateApi";
// import toastr from 'toastr'
// import 'toastr/build/toastr.min.css'
// import { useLocation, useNavigate } from "react-router-dom";

// const UpdateFacility = () => {
//   const [breadcrumbItems] = useState([
//     { title: "KingMajesty", link: "/" },
//     { title: "Create Facilities", link: "#" },
//   ]);

//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const facilityName = searchParams.get("facilityName");
//   const image = searchParams.get("image");
//   const id = searchParams.get("id")
//   console.log(facilityName);
//   console.log("id in update ",id);

//   // Form data and validation state
//   const [formData, setFormData] = useState({
//     facilityName: "",
//     file: null, // Updated to handle file input
//   });

//   const [validation, setValidation] = useState({
//     facilityName: true,
//   });

//   // Function to handle form submission
//   const handleSubmit = async (e) => {
//     console.log("Inside");
//     e.preventDefault();

//     // Validate form fields
//     const fieldsToValidate = ["facilityName"];
//     let isFormValid = true;

//     fieldsToValidate.forEach((field) => {
//       const value = formData[field];
//       const isValid = value.trim() !== "";
//       setValidation((prevValidation) => ({
//         ...prevValidation,
//         [field]: isValid,
//       }));

//       // Update isFormValid based on current field validation
//       isFormValid = isFormValid && isValid;
//     });

//     // If form is not valid, return early
//     if (!isFormValid) {
//       return;
//     }

//     // Make API call to submit form data
//     try {
//       // Assuming submitFacilityData is an async function that handles the API call
//       console.log("Inside Api call");
//       await facilityUpdateApi(formData,id);

//       // Clear form data on successful submission
//       setFormData({
//         facilityName: "",
//         file: null,
//       });
//       toastr.success('Facility updated successfully!', 'Success');

//       // Optionally, add any success messages or redirection logic here
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toastr.error('An error occurred. Please try again.', 'Error');
//       // Handle error (e.g., display an error message)
//     }
//   };

//   // Function to handle input changes
//   const handleInputChange = (event, field) => {
//     const { value } = event.target;
//     setFormData((prevData) => ({ ...prevData, [field]: value }));
//     setValidation((prevValidation) => ({
//       ...prevValidation,
//       [field]: value.trim() !== "",
//     }));
//   };

//   // Function to handle file input changes
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setFormData((prevData) => ({ ...prevData, file }));
//   };


//   const navigate = useNavigate();
//   const handleNavigate = () => {
//     navigate("/facilities");
//   };
 
//   return (
//     <div className="page-content">
//       <Container fluid={true}>
//         <Breadcrumbs
//           title="Create Facilities"
//           breadcrumbItems={breadcrumbItems}
//         />
//         <Form>
//           <Card>
//             <CardBody>
//             <Row  className="align-items-center  d-flex mb-3 rounded bg-subbar border border-info">              
//                 <Col
//                    xs="12"
//                    md="12"
//                   className="mb-2 d-md-flex justify-content-md-start"
//                 >
//                   <Button
//                     type="button"
//                     color="warning"
//                     className="btn-rounded me-2 mt-2 text-black"
//                     onClick={handleNavigate}
//                   >
//                     <i className="mdi mdi-arrow-left me-1" />
//                     Back to List
//                   </Button>
//                 </Col>
     
//               </Row>
//               <AvForm
//                 id="validationCustomForm"
//                 className="needs-validation"
//                 onSubmit={handleSubmit}
//                 noValidate
//               >
//                 <Row>
//                   <Col lg="6">
//                     <TextInput
//                       name="Facility"
//                       placeholder="Facility Name"
//                       errorMessage="Enter Facility Name"
//                       defaultValue={facilityName}
//                       validation={validation.facilityName}
//                       onChange={(e) => handleInputChange(e, "facilityName")}
//                     />
//                   </Col>
//                   <Col lg="6">
//                     <ChooseFileInput
//                       label="Choose Media"
//                       id="inputGroupFile01"
//                       defaultValue={image}
//                       onChange={handleFileChange}
//                     />
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col lg="12" className="d-flex flex-row-reverse">
//                     <Button type="submit" className="bg-info text-dark" onClick={handleSubmit}>
//                       Update
//                     </Button>
//                   </Col>
//                 </Row>
//               </AvForm>
//             </CardBody>
//           </Card>
//         </Form>
//       </Container>
//     </div>
//   );
// };

// export default UpdateFacility;