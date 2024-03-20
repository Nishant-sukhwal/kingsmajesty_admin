import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Container } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { BasicInfoAddApi } from "../../../services/api/hotel/hotelCreateApi";
import GenericFormAvfield from "../../../components/Form/GenricForm/GenricFormAvfield";
import { useDispatch } from "react-redux";
import { getHotelId } from "../../../store/hotel/actions";
import GenralForm from "../../../components/Form/GenricForm/GenralForm";

const BasicInfoForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    email: "",
    mobile: "",
    classStatus: "",
    releaseStatus: "",
    description: "",
    hotelCategory: "",
  });
  console.log(formData);

  const formFields = {
    form: [
      {
        fieldName: "name",
        label: "Hotel Name",
        type: "text",
        errorMessage: "Please Enter Hotel Name.",
        placeholder: "Enter Hotel Name.",
        value: "",
      },
      {
        fieldName: "category",
        label: "Hotel Category",
        type: "select",
        errorMessage: "Select Room Category Name",
        value: formData.category,
        placeholder: "Select Room Category. eg: Delux, SuperDelux, Prime...",
        options: [
          { value: "Resort", label: "Resort" },
          { value: "Villa", label: "Villa" },
          { value: "Business", label: "Business" },
          { value: "Other", label: "Other" },
        ],
      },
      {
        fieldName: "tagline",
        label: "Tag Line",
        type: "address",
        errorMessage: "Please Enter Tag Line For Your Hotel.",
        placeholder: "Enter Tag Line, eg: The perfect place for getaways!",
        value: "",
      },
      {
        fieldName: "mobile",
        label: "Mobile",
        type: "number",
        errorMessage: "Please Enter Mobile Number.",
        placeholder: "Enter Mobile Number.",
        value: "",
        maxLength: "10",
      },
      {
        fieldName: "email",
        label: "Email",
        type: "email",
        errorMessage: "Please Enter Email.",
        placeholder: "Enter Email.",
        value: "",
      },

      {
        fieldName: "description",
        label: "Description",
        type: "editor",
      },
    ],
  };

  const handleFormChange = (fieldName, value) => {
    console.log(fieldName, value);
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  // useImperativeHandle(ref, () => ({
  //   submitForm,
  // }));

  return (
    <div>
      <Container fluid={true}>
        <GenralForm formFields={formFields} onChange={handleFormChange} />
      </Container>
    </div>
  );
});

export default BasicInfoForm;
