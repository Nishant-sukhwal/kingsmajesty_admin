import React, { useEffect, useState } from "react";
import { Form, Card, CardBody, Container, Button } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import SubHeader from "../../components/Common/SubHeader";
import GenralForm from "../../components/Form/GenricForm/GenralForm";
import {
  getHotelCategoryByIdApi,
  hotelCategoryUpdateApi,
} from "../../services/api/hotelCategory/hotelCategorysApi";
import {
  getRoomCategoryByIdApi,
  roomCategoryUpdateApi,
} from "../../services/api/roomCategory/roomCategoryApi";

const UpdateRoomCategoryForm = () => {
  const [breadcrumbItems] = useState([
    { title: "KingMajesty", link: "/" },
    { title: "Update Hotel Category", link: "#" },
  ]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [formData, setFormData] = useState({ name: "", media: "" });
  const [fetchedData, setFetchedData] = useState({ name: "", media: "" });
  console.log("formData formData formData", formData);

  const handleFormChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRoomCategoryByIdApi(id);
        console.log(data);
        setFetchedData((prevData) => ({
          ...prevData,
          name: data.roomCategory.name,
        }));
        setFormData((prevData) => ({
          ...prevData,
          name: data.roomCategory.name,
        }));
      } catch (error) {
        console.error("Error fetching Room Category data:", error);
      }
    };
    fetchData();
  }, [id]);

  // Function to handle form submission
  const handleSubmit = async (e, errors) => {
    e.preventDefault();
    try {
      const res = await roomCategoryUpdateApi(formData, id);
      console.log(res);
      setFormData({
        media: "" || null,
        name: "",
      });
      toastr.success("Room Category updated successfully!", "Success");
    } catch (error) {
      toastr.error("An error occurred. Please try again.", "Error");
    }
  };

  const formFields = {
    backbutton: "/facilities",
    form: [
      {
        fieldName: "name",
        label: "Name",
        type: "text",
        errorMessage: "Enter Room Category",
        placeholder: "Enter Room Category Name",
        value: fetchedData?.name,
      },
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
              <SubHeader value={"/roomcategory"} />
              <GenralForm formFields={formFields} onChange={handleFormChange} />
              <Button color="primary" type="submit" onClick={handleSubmit}>
                Update
              </Button>
            </CardBody>
          </Card>
        </Form>
      </Container>
    </div>
  );
};

export default UpdateRoomCategoryForm;
