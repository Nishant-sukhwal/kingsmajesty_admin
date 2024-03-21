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
import SubHeader from "../../components/Common/SubHeader";
import GenralForm from "../../components/Form/GenricForm/GenralForm";

const CreateFacility = () => {

  const [formData, setFormData] = useState({
    name: "",
    media: null,
  });

  console.log(formData);

  const handleFormChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };



  const formFields = {
    backbutton: "/facilities",
    form: [
      { fieldName: "name", label: "Name", type: "text", errorMessage: "Enter Facility", placeholder: "Enter Facility Name" },
      { fieldName: "media", label: "Media", type: "file", errorMessage: "Select File", value: formData.thumbnail, placeholder: "Select Image...", imageViewer: true, },
    ],
  };

  // const formFields = [
  //   { name: "name", label: "Name", required: true },
  //   {
  //     name: "media",
  //     label: "Media File",
  //     type: "file",
  //     accept: "image/*, video/*",
  //     required: true,
  //   },
  // ]

  const [breadcrumbItems] = useState([
    { title: "KingMajesty", link: "/" },
    { title: "Create Facilities", link: "#" },
  ]);

  const handleSubmit = async () => {
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
      await facilityCreateApi(formData);
      toastr.success("Facility created successfully");
    } catch (error) {
      console.error(error);
      toastr.error("Failed to create facility");
    }

  };


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
            <GenralForm formFields={formFields} onChange={handleFormChange} />
            <Button color="primary" type="submit" onClick={handleSubmit}>Submit</Button>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default CreateFacility;
