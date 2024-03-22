
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
    { title: "Update Facilities", link: "#" },
  ]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  console.log(searchParams);
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
          title="Update Facilities"
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
