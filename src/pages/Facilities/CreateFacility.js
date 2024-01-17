import React, { useEffect, useState } from "react";
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
import { facilityCreateApi } from "../../services/api/facility/facilityCreateApi";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

import GenericFormAvfield from "../../components/Form/GenricForm/GenricFormAvfield";
import SubHeader from "../../components/Common/SubHeader";

const CreateFacility = () => {

  const [formData, setFormData] = useState({
    name: "",
    media: null,
  });

  console.log(formData);

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

  const [breadcrumbItems] = useState([
    { title: "KingMajesty", link: "/" },
    { title: "Create Facilities", link: "#" },
  ]);

  const handleSubmit = async (event, errors, values) => {
    event.preventDefault();

    if (errors.length === 0) {
      try {
        await facilityCreateApi(formData);
        toastr.success("Facility created successfully");
      } catch (error) {
        console.error(error);
        toastr.error("Failed to create facility");
      }
    } else {
      // Handle validation errors (e.g., display an error message)
      toastr.error("Please fill in all required fields");
    }
  };

  // const handleInputChange = (event, field, value) => {
  //   setFormData((prevData) => ({ ...prevData, [field]: value || event.target.value }));
  // };

  const handleInputChange = (event, field, value) => {
    if (field === "media") {
      setFormData((prevData) => ({ ...prevData, [field]: event.target.files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [field]: value || event.target.value }));
    }
  };

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs
          title="Create Facilities"
          breadcrumbItems={breadcrumbItems}
        />
        <Card>
          <CardBody>
            <SubHeader value={'/facilities'} />
            <AvForm onSubmit={handleSubmit}>
              <GenericFormAvfield fields={formFields} onInputChange={handleInputChange} />
              <Button color="primary" type="submit">
                Submit
              </Button>
            </AvForm>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default CreateFacility;




//Last Code 13-1-24   {/* <GenricForm  formModule={formModule} /> */}

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
// import ChooseFileInput from "../../components/Form/FormComponents/ChooseFileInput";
// import TextInput from "../../components/Form/FormComponentsValidate/TextInput";
// import { facilityCreateApi } from "../../services/api/facility/facilityCreateApi";
// import toastr from 'toastr'
// import 'toastr/build/toastr.min.css'
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { createFacility } from "../../store/actions";
// import GenricForm from "../../components/Form/GenricForm/GenricForm";
// import GenericFormAvfield from "../../components/Form/GenricForm/GenricFormAvfield";

// const CreateFacility = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formModule, setFormModule] = useState();

//   const formFields = [
//     { name: "name", label: "Name", required: true },
//     {
//       name: "media",
//       label: "Media File",
//       type: "file",
//       accept: "image/*, video/*",
//       required: false,
//     },
//   ]

//   // useEffect(() => {
//   //   const createFacilityForm = {
//   //     type: 'create',
//   //     backToList: '/facilities',
//   //     form: {
//   //       facilityName: { fieldName: 'Facility Name', value: '', type: 'email', required: true },
//   //       // facilityName: { fieldName: 'Facility Name', value: '', type: 'text', required: true },
//   //       image: { fieldName: 'ChooseMedia', value: '', type: 'upload', required: true }
//   //     },
//   //   }

//   //   setFormModule(createFacilityForm)
//   // }, [])


//   const [breadcrumbItems] = useState([
//     { title: "KingMajesty", link: "/" },
//     { title: "Create Facilities", link: "#" },
//   ]);

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
//       // await facilityCreateApi(formData);
//       dispatch(createFacility(formData));
//       handleNavigate();
//       // Clear form data on successful submission
//       setFormData({
//         facilityName: "",
//         file: null,
//       });
//       toastr.success('Facility created successfully!', 'Success');

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
//         <Card>
//           <CardBody>
//             <GenericFormAvfield fields={formFields} />
//           </CardBody>
//         </Card>

//         {/* <GenricForm  formModule={formModule} /> */}

//       </Container>
//     </div>
//   );
// };

// export default CreateFacility;




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

// const CreateFacility = () => {
//   const [breadcrumbItems] = useState([
//     { title: "KingMajesty", link: "/" },
//     { title: "Create Facilities", link: "#" },
//   ]);

//   // Normal Input element Validation
//   const [formData, setFormData] = useState({
//     facilityName: "",
//     img: "",
//   });

//   const [validation, setValidation] = useState({
//     fnm: true,
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const fieldsToValidate = ["facilityName"];

//     fieldsToValidate.forEach((field) => {
//       const value = formData[field];
//       const isValid = value.trim() !== "";
//       setValidation((prevValidation) => ({
//         ...prevValidation,
//         [field]: isValid,
//       }));
//     });

//     document
//       .getElementById("validationCustomForm")
//       .classList.add("was-validated");
//   };

//   const handleInputChange = (event, field) => {
//     const { value } = event.target;
//     setFormData((prevData) => ({ ...prevData, [field]: value }));
//     setValidation((prevValidation) => ({
//       ...prevValidation,
//       [field]: value.trim() !== "",
//     }));
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setFormData((prevData) => ({ ...prevData, file }));
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
//                       validation={validation.fnm}
//                       onChange={handleInputChange}
//                     />
//                   </Col>

//                   <Col lg="6">
//                     <ChooseFileInput
//                       label="Choose Media"
//                       id="inputGroupFile01"
//                       onChange={handleFileChange}
//                     />
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col lg="12" className="d-flex flex-row-reverse">
//                     <Button className="primary">Submit</Button>
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

// export default CreateFacility;





//Form

{/* <Form>
          <Card>
            <CardBody>
              <Row className="align-items-center  d-flex mb-3 rounded bg-subbar border border-info">
                <Col
                  xs="12"
                  md="12"
                  className="mb-2 d-md-flex justify-content-md-start"
                >
                  <Button
                    type="button"
                    color="warning"
                    className="btn-rounded me-2 mt-2 text-black"
                    onClick={handleNavigate}
                  >
                    <i className="mdi mdi-arrow-left me-1" />
                    Back to List
                  </Button>
                </Col>

              </Row>
              <AvForm
                id="validationCustomForm"
                className="needs-validation"
                onSubmit={handleSubmit}
                noValidate
              >
                <Row>
                  <Col lg="6">
                    <TextInput
                      name="Facility"
                      placeholder="Facility Name"
                      errorMessage="Enter Facility Name"
                      validation={validation.facilityName}
                      onChange={(e) => handleInputChange(e, "facilityName")}
                    />
                  </Col>
                  <Col lg="6">
                    <ChooseFileInput
                      label="Choose Media"
                      id="inputGroupFile01"
                      onChange={handleFileChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg="12" className="d-flex flex-row-reverse">
                    <Button type="submit" className="bg-info text-dark" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Col>
                </Row>
              </AvForm>
            </CardBody>
          </Card>
        </Form>  */}