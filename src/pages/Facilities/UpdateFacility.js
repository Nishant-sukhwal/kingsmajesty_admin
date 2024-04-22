
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
import ChooseFileInput from "../../components/Form/FormComponents/ChooseFileInput";
import TextInput from "../../components/Form/FormComponentsValidate/TextInput";
import { facilityUpdateApi, getFacilityById } from "../../services/api/facility/facilityCreateApi";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { useLocation, useNavigate } from "react-router-dom";
import SubHeader from "../../components/Common/SubHeader";
import GenericFormAvfield from "../../components/Form/GenricForm/GenricFormAvfield";
import GenralForm from "../../components/Form/GenricForm/GenralForm";

const UpdateFacility = () => {
  const [breadcrumbItems] = useState([
    { title: "KingMajesty", link: "/" },
    { title: "Update Facility", link: "#" },
  ]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const image = searchParams.get("image");
  const id = searchParams.get("id")
  const [formData, setFormData] = useState({ name: "", media: "" });
  const [fetchedData, setFetchedData] = useState({ name: "", media: "" });
  console.log("formData formData formData",formData);

  const handleFormChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  useEffect(() => {
    const fetchFacilityData = async () => {
      try {
        const facilityData = await getFacilityById(id);
        setFetchedData(prevData => ({
          ...prevData,
          name: facilityData.facility.facilityName,
          media: facilityData.facility.image,
        }));
        setFormData(prevData => ({
          ...prevData,
          name: facilityData.facility.facilityName,
          media: facilityData.facility.image,
        }));
      } catch (error) {
        console.error("Error fetching facility data:", error);
        // Handle error (e.g., display an error message)
      }
    };
    fetchFacilityData();
  }, [id]);

  // Function to handle form submission
  const handleSubmit = async (e, errors) => {

    e.preventDefault();

    try {
      // Assuming submitFacilityData is an async function that handles the API call

      const res = await facilityUpdateApi(formData, id);
      console.log(res);
      //Clear form data on successful submission
      setFormData({

        media: "" || null,
        name: ""
      });

      toastr.success('Facility updated successfully!', 'Success');

      // Optionally, add any success messages or redirection logic here
    } catch (error) {
      console.error("Error submitting form:", error);
      toastr.error('An error occurred. Please try again.', 'Error');
      // Handle error (e.g., display an error message)
    }

  };

  // Conditional image URL variable
  const imageUrl = fetchedData?.media ? `${fetchedData.media}` : null;

  const formFields = {
    backbutton: "/facilities",
    form: [
      { fieldName: "name", label: "Name", type: "text", errorMessage: "Enter Facility", placeholder: "Enter Facility Name", defaultValue: fetchedData?.name },
      { fieldName: "media", label: "Media", type: "file", errorMessage: "Select File", value: imageUrl, placeholder: "Select Image...", imageViewer: true, },
    ],
  };

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
              {/* <AvForm >
                <GenericFormAvfield fields={formFields} onInputChange={handleInputChange} prefilledvalue={facilityName} />

                <Button color="primary" type="submit" onClick={handleSubmit} >
                  Update
                </Button>
              </AvForm> */}
              <GenralForm formFields={formFields} onChange={handleFormChange} />
              <Button color="primary" type="submit" onClick={handleSubmit}>Update</Button>
            </CardBody>
          </Card>
        </Form>
      </Container>
    </div>
  );
};

export default UpdateFacility;
