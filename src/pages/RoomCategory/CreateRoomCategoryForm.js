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

const CreateRoomCategoryForm = () => {

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
    { title: "Create Room Category", link: "#" },
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

export default CreateRoomCategoryForm;