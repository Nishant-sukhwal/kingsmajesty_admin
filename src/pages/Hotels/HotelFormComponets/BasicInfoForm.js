import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Container } from "reactstrap";
import toastr from "toastr";
import { BasicInfoAddApi } from "../../../services/api/hotel/hotelCreateApi";
import GenericFormAvfield from "../../../components/Form/GenricForm/GenricFormAvfield";
import { useDispatch } from "react-redux";
import { getHotelId } from "../../../store/hotel/actions";
import GenralForm from "../../../components/Form/GenricForm/GenralForm";
import "toastr/build/toastr.min.css";

const BasicInfoForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    tag: "",
    email: "",
    mobile: "",
    classStatus: "",
    releaseStatus: "",
    description: "",
    hotelCategory: "",
  });

  const handleFormChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const categoryOptions = [
    { value: "Resort", label: "Resort" },
    { value: "Villa", label: "Villa" },
    { value: "Business", label: "Business" },
    { value: "Other", label: "Other" },
  ]

  const formFields = {
    form: [
      { fieldName: "name", label: "Name", type: 'text', required: true, errorMessage: "Please Enter Name", placeholder: "Enter Hotel Name", },
      { fieldName: "hotelCategory", label: "Hotel Category", type: "select", errorMessage: "Please Select Hotel Cetegory", placeholder: "Select Hotel Cetegory", isMulti: false, options: categoryOptions },
      { fieldName: "email", label: "Email", type: 'email', required: true, errorMessage: "Please Enter Email", placeholder: "Enter Email Address" },
      { fieldName: "mobile", label: "Mobile", type: 'number', required: true, errorMessage: "Please Enter Mobile Number", placeholder: "Enter Mobile Number" },
      { fieldName: "classStatus", label: "Class", type: "radio", options: ["1star", "2star", "3star", "4star", "5star"], required: true },
      { fieldName: "releaseStatus", label: "Release", type: "radio", options: ["Published", "NotPublished", "Awaiting", "Archived"], required: true },
      { fieldName: "tag", label: "Tag Line", type: 'address', required: true, errorMessage: "Please Enter Tag Line", placeholder: "Enter Tag Line" },
      { fieldName: "description", label: "Description", type: "editor" },
    ],
  };




  const submitForm = async () => {
    // Check if all required fields are filled
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
      const res = await BasicInfoAddApi(formData);
      dispatch(getHotelId(res.data.basicInfo._id));
      if (res.status === 201) {
        toastr.success(res.data.message);
      }
      if (props.onSubmitSuccess) {
        props.onSubmitSuccess();
      }
    } catch (error) {
      console.error(error);
      toastr.error("Failed to create Hotel");
    }
  };

  //Call from parent component
  useImperativeHandle(ref, () => ({
    submitForm
  }));

  return (
    <div>
      <Container fluid={true}>
        <GenralForm formFields={formFields} onChange={handleFormChange} />
      </Container>
    </div>
  );
});

export default BasicInfoForm;
