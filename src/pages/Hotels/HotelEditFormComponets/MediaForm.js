import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Row, Col, Label, Form, Container } from "reactstrap";
import ImageViewer from "../../../components/Form/FormComponents/ImageViewer";
import ChooseFileInput from "../../../components/Form/FormComponents/ChooseFileInput";
import { AvForm } from "availity-reactstrap-validation";
import { MediaAddApi } from "../../../services/api/hotel/hotelCreateApi";
import { useSelector } from "react-redux";
import GenralForm from "../../../components/Form/GenricForm/GenralForm";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useLocation } from "react-router-dom";

const MediaForm = forwardRef((props, ref) => {
  const hotelId = useSelector((state) => state.Hotel.id);
  const hotel = useSelector((state) => state.Hotel.data);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id")

  const [formData, setFormData] = useState({
    gallery: [],
    thumbnail: "",
  });
  console.log(formData);

  const handleFormChange = (fieldName, value) => {
    console.log(fieldName, value);
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      gallery: hotel?.gallery,
      thumbnail: hotel?.thumbnail,
    }))
    
  }, [hotel, id])


  const formFields = {
    form: [
      {
        fieldName: "thumbnail",
        label: "Thumbnail",
        type: "file",
        errorMessage: "Select File",
        value: formData.thumbnail,
        placeholder: "Select Image...",
        imageViewer: true, // Enable image viewer for this field
      },
      {
        fieldName: "gallery",
        label: "Gallery",
        type: "file",
        errorMessage: "Select File",
        placeholder: "Select Image...",
        value: formData.gallery,
        multiple: true,
        imageViewer: true, // Enable image viewer for this field
      },
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

    if (props.onSubmitSuccess) {
      props.onSubmitSuccess();
    }

    try {
      // Your API submission logic here
      const formDataToSend = new FormData();
      formDataToSend.append("thumbnail", formData.thumbnail);
      formData.gallery.forEach((file, index) => {
        formDataToSend.append(`gallery_${index}`, file);
      });
      const res = await MediaAddApi(formDataToSend, hotelId);
      toastr.success(res.data.message);
      if (props.onSubmitSuccess) {
        props.onSubmitSuccess();
      }
    } catch (error) {
      console.error(error);
      // Handle API error or provide feedback to the user
    }
  };

  useImperativeHandle(ref, () => ({
    submitForm,
  }));

  return (
    <div>
      <Container fluid={true}>
        <GenralForm formFields={formFields} onChange={handleFormChange} />
      </Container>
    </div>
  );
});

export default MediaForm;