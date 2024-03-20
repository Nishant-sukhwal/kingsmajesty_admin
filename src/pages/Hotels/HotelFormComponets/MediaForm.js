import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Row, Col, Label, Form, Container } from "reactstrap";
import ImageViewer from "../../../components/Form/FormComponents/ImageViewer";
import ChooseFileInput from "../../../components/Form/FormComponents/ChooseFileInput";
import { AvForm } from "availity-reactstrap-validation";
import { MediaAddApi } from "../../../services/api/hotel/hotelCreateApi";
import { useSelector } from "react-redux";
import GenralForm from "../../../components/Form/GenricForm/GenralForm";


const MediaForm = forwardRef((props, ref) => {
  const hotelId = useSelector((state) => state.Hotel.id);
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
    if (props.onSubmitSuccess) {
      props.onSubmitSuccess();
    }

    try {
      // // Your API submission logic here
      const formData = new FormData();
      // formData.append("thumbnail", thumbnail);
      // gallery.forEach((file, index) => {
      //   formData.append(`gallery_${index}`, file);
      // });

      console.log("formData in media: ", formData);
      // // Call your API service with the formData
      const res = await MediaAddApi(formData, hotelId);
      console.log(res);

      if (props.onSubmitSuccess) {
        props.onSubmitSuccess();
      }
      // // Handle success or provide feedback to the user
      // if (res.status === 201) {
      //   console.log("Media added successfully");
      // }

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