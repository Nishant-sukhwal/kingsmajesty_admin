import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Container } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { BasicInfoAddApi } from "../../../services/api/hotel/hotelCreateApi";
import GenericFormAvfield from "../../../components/Form/GenricForm/GenricFormAvfield";
import { useDispatch } from "react-redux";
import { getHotelId } from "../../../store/hotel/actions";


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
    hotelCategory:"",
  });
  console.log(formData);

  
  

  const formFields = [
    { name: "name",  label: "Name", required: true },
    { name: "tag", label: "TagLine", required: true },
    { name: "email", label: "Email",type: "email" , required: true },
    { name: "mobile", label: "Mobile", type: "text", max:'10', required: true },
    {
      name: "classStatus",
      label: "Class",
      type: "radio",
      options: ["1star", "2star", "3star", "4star", "5star"],
      required: true,
    },
    {
      name: "releaseStatus",
      label: "Release",
      type: "radio",
      options: ["Published", "NotPublished", "Awaiting", "Archived"],
      required: true,
    },
    {
      name: "hotelCategory",
      label: "Hotel Category",
      value: formData.hotelCategory,
      type: "select",
      options: [
        { value: "Resort", label: "Resort" },
        { value: "Villa", label: "Villa" },
        { value: "Business", label: "Business" },
        { value: "Other", label: "Other" },
      ],
      required: true,
    },
    { name: "description", label: "Description", type: "ckeditor" },
  ];


  const handleInputChange = (event, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value || event.target.value,
    }));
  };

  const handleCKEditorChange = (field, data) => {
    setFormData((prevData) => ({ ...prevData, [field]: data }));
  };

  const submitForm = async () => {
    // Check if all required fields are filled
    const missingFields = formFields.filter(
      (field) => field.required && !formData[field.name]
    );

    if (missingFields.length > 0) {
      // Display error message for missing fields
      toastr.error(
        `Please fill in the following fields: ${missingFields
          .map((field) => field.label)
          .join(", ")}`
      );
      return;
    }
    try {
      const res = await BasicInfoAddApi(formData);
      dispatch(getHotelId(res.data.basicInfo._id));//hotel id for update next form information in same entry
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

  useImperativeHandle(ref, () => ({
    submitForm
  }));

  return (
    <div>
      <Container fluid={true}>
        <AvForm>
          <GenericFormAvfield
            fields={formFields}
            onInputChange={handleInputChange}
            onCKEditorChange={handleCKEditorChange}
          />
        </AvForm>
      </Container>
    </div>
  );
});

export default BasicInfoForm;

// import React, { useImperativeHandle, useState } from "react";
// import { Button, Card, CardBody, Container } from "reactstrap";
// import SubHeader from "../../../components/Common/SubHeader";
// import { AvForm } from "availity-reactstrap-validation";
// import GenericFormAvfield from "../../../components/Form/GenricForm/GenricFormAvfield";
// import toastr from "toastr";
// import "toastr/build/toastr.min.css";
// import { BasicInfoAddApi } from "../../../services/api/hotel/hotelCreateApi";

// const BasicInfoForm = () => {

//   const [formData, setFormData] = useState({
//     name: "",
//     media: null,
//     tag: "",
//     email: "",
//     telephone: "",
//     classStatus: "",
//     releaseStatus: "",
//     description: "",
//   });

//   const formFields = [
//     { name: "name", label: "Name", required: true },
//     { name: "tag", label: "TagLine", required: true },
//     { name: "email", label: "Email", required: true },
//     { name: "telephone", label: "Mobile", required: true },
//     {
//       name: "classStatus",
//       label: "Class",
//       type: "radio",
//       options: ["1star", "2star", "3star", "4star", "5star"],
//       required: true,
//     },
//     {
//       name: "releaseStatus",
//       label: "Release",
//       type: "radio",
//       options: ["Published", "NotPublished", "Awaiting", "Archived"],
//       required: true,
//     },
//     { name: "description", label: "Description", type: "ckeditor" }, // Added CKEditor field
//   ];

//   const handleInputChange = (name, value) => {
//     console.log("handleInputChange called with:", name, value);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event, errors, values) => {
//     console.log("im inside!");
//     event.preventDefault();

//     if (errors.length === 0) {
//       try {
//         // Perform your form submission logic here using formData
//         const res = await BasicInfoAddApi(formData);
//         console.log(res);
//         toastr.success("Hotel created successfully");

//       } catch (error) {
//         console.error(error);
//         toastr.error("Failed to create Hotel");
//       }
//     } else {
//       toastr.error("Please fill data in all required fields!");
//     }
//   };

//   return (
//     <div>
//       <Container fluid={true}>
//         <AvForm onSumit={handleSubmit}>
//           <GenericFormAvfield
//             fields={formFields}
//             onInputChange={handleInputChange}
//           />
//         </AvForm>
//       </Container>
//     </div>
//   );
// };

// export default BasicInfoForm;
