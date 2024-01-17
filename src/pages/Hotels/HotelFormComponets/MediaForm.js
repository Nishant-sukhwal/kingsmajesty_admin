import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Row, Col, Label, Form } from "reactstrap";
import ImageViewer from "../../../components/Form/FormComponents/ImageViewer";
import ChooseFileInput from "../../../components/Form/FormComponents/ChooseFileInput";
import { AvForm } from "availity-reactstrap-validation";
import { MediaAddApi } from "../../../services/api/hotel/hotelCreateApi";
import { useSelector } from "react-redux";


const MediaForm = forwardRef((props, ref) => {
  const hotelId = useSelector((state) => state.Hotel.id);
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);

  const handleGalleryFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setGallery([...gallery, ...selectedFiles]);
  };

  const handleThumbnailFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setThumbnail(selectedFile);
  };

  const removeGalleryFile = (index) => {
    const updatedGallery = [...gallery];
    updatedGallery.splice(index, 1);
    setGallery(updatedGallery);
  };

  const removeThumbnailFile = () => {
    setThumbnail(null);
  };


  const submitForm = async () => {
    if (props.onSubmitSuccess) {
      props.onSubmitSuccess();
    }

    try {
      // // Your API submission logic here
      const formData = new FormData();
      formData.append("thumbnail", thumbnail);
      gallery.forEach((file, index) => {
        formData.append(`gallery_${index}`, file);
      });
     
      console.log("formData in media: ",formData);
      // // Call your API service with the formData
      const res = await MediaAddApi(formData,hotelId);
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
    <AvForm>

    <Row >
        <Col lg="6">
          <ChooseFileInput
            label="Thumbnail"
            id="inputGroupFileThumbnail"
            onChange={handleThumbnailFileChange}
          />
        </Col>
        <Col lg="6">
          <ImageViewer files={thumbnail ? [thumbnail] : []} onRemoveFile={removeThumbnailFile} />
        </Col>
      </Row>
      
      <Row className="mt-3">
        <Col lg="6">
          <ChooseFileInput
            label="Gallery"
            id="inputGroupFileGallery"
            onChange={handleGalleryFileChange}
            multiple
          />
        </Col>
        <Col lg="6">
          <ImageViewer files={gallery} onRemoveFile={removeGalleryFile} />
        </Col>
      </Row>
    </AvForm>
  );
});

export default MediaForm;
















// const MediaForm = () => {
//   const [formData, setFormData] = useState({
//     thumbnail: null, // Add a field for Thumbnail
//     gallery: [],   // Add a field for Gallery
//   });
//   console.log(formData);
//   const handleInputChange = (event, field, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [field]: value || event.target.value,
//     }));
//   };

 
//   const handleFileChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     setFormData((prevData) => ({ ...prevData, files: [...prevData.files, ...selectedFiles] }));
//   };


//   const removeFile = (index) => {
//     const updatedGallery = [...formData.gallery];
//     updatedGallery.splice(index, 1);
//     setFormData((prevData) => ({ ...prevData, gallery: updatedGallery }));
//   };

//   const formFields = [
//     { name: "thumbnail", label: "Thumbnail", type: "file",accept: "image/*, video/*" },
//     { name: "gallery", label: "Gallery", type: "file", accept: "image/*, video/*", multiple: true },
//   ];

//   return (
//     <AvForm>
//       <Row>
//         <Col md="12">
//           <GenericFormAvfield
//             fields={formFields}
//             onInputChange={handleInputChange}
//             onFileChange={(files) => handleFileChange("thumbnail", files)}
//           />
//         </Col>
//         <Col md="6">
//           <ImageViewer files={formData.gallery} onRemoveFile={removeFile} />
//         </Col>
//       </Row>
//     </AvForm>
//   );
// };

// export default MediaForm;
