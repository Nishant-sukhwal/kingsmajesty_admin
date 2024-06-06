import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Card, CardBody, Col, Container, Label, Row ,Input} from "reactstrap";
import toastr from "toastr";
import { BasicInfoAddApi, BasicInfoUpdateApi, getHotelByIdApi } from "../../../services/api/hotel/hotelCreateApi";
import GenericFormAvfield from "../../../components/Form/GenricForm/GenricFormAvfield";
import { useDispatch, useSelector } from "react-redux";
import { getHotelById, getHotelId } from "../../../store/hotel/actions";
import GenralForm from "../../../components/Form/GenricForm/GenralForm";
import "toastr/build/toastr.min.css";
import { getHotelCategoryApi } from "../../../services/api/hotelCategorysApi";
import { useLocation } from "react-router-dom";



const BasicInfoForm = forwardRef((props, ref) => {
  const hotel = useSelector((state) => state.Hotel.data);
  const dispatch = useDispatch();
  
  const [toggleSwitch, setToggleSwitch] = useState(true); // State for toggle switch
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file


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
  console.log("Basic Info FormData-==-===-=-=-=-=-=-=--->", formData);
  const [hotelCategories, setHotelCategories] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id")
  console.log(hotelCategories);


  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      name: hotel?.name,
      tag: hotel?.tag,
      email: hotel?.email,
      mobile: hotel?.mobile,
      classStatus: hotel?.classStatus,
      releaseStatus: hotel?.releaseStatus,
      description: hotel?.description,
      hotelCategory: hotel?.hotelCategory,
    }))
  }, [hotel, id])



  useEffect(() => {
    const hotelCetegories = async () => {
      try {
        //api call
        const res = await getHotelCategoryApi();
        const categoryOptions = res.data.hotelCategories.map(category => ({
          value: category.name,
          label: category.name
        }));
        setHotelCategories(categoryOptions);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };
    hotelCetegories();
  }, [])



  const handleFormChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const formFields = {
    form: [
      { fieldName: "name", label: "Name", type: 'text', required: true, errorMessage: "Please Enter Name", placeholder: "Enter Hotel Name", defaultValue: hotel?.name },
      { fieldName: "hotelCategory", label: "Hotel Category", type: "select", errorMessage: "Please Select Hotel Cetegory", placeholder: "Select Hotel Cetegory", isMulti: false, options: hotelCategories, defaultValue: hotel?.hotelCategory },
      { fieldName: "email", label: "Email", type: 'email', required: true, errorMessage: "Please Enter Email", placeholder: "Enter Email Address", defaultValue: hotel?.email },
      { fieldName: "mobile", label: "Mobile", type: 'number', required: true, errorMessage: "Please Enter Mobile Number", placeholder: "Enter Mobile Number", defaultValue: hotel?.mobile },
      { fieldName: "classStatus", label: "Class", type: "radio", options: ["1star", "2star", "3star", "4star", "5star"], required: true, defaultValue: hotel?.classStatus },
      { fieldName: "releaseStatus", label: "Release", type: "radio", options: ["Published", "NotPublished", "Awaiting", "Archived"], required: true, defaultValue: hotel?.releaseStatus },
      { fieldName: "tag", label: "Tag Line", type: 'address', required: true, errorMessage: "Please Enter Tag Line", placeholder: "Enter Tag Line", defaultValue: hotel?.tag },
      { fieldName: "description", label: "Description", type: "editor", defaultValue: hotel?.description },
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
      const res = await BasicInfoUpdateApi(formData, id);
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
       
        <Row>
      <Col lg={6}>
        <Card>
          <CardBody>
            <h4 className="card-title">Switches</h4>
            <p className="card-title-desc">
              A switch has the markup of a custom checkbox but uses the <code>.custom-switch</code> className to render a
              toggle switch. Switches also support the <code>disabled</code> attribute.
            </p>

            <div className="form-check form-switch mb-3" dir="ltr">
              <Input
                type="checkbox"
                className="form-check-input"
                id="customSwitch1"
                checked={toggleSwitch}
                onChange={() => setToggleSwitch(!toggleSwitch)}
              />
              <Label className="form-check-label" htmlFor="customSwitch1">
                Toggle this switch element
              </Label>
            </div>
            
            <div className="form-check form-switch" dir="ltr">
              <Input type="checkbox" className="form-check-input" disabled id="customSwitch2" />
              <Label className="form-check-label" htmlFor="customSwitch2">
                Disabled switch element
              </Label>
            </div>
          </CardBody>
        </Card>
      </Col>

      <Col lg={6}>
        <Card>
          <CardBody>
            <h4 className="card-title">File browser</h4>
            <p className="card-title-desc">
              The file input is the most gnarly of the bunch and requires additional JavaScript if you’d like to hook
              them up with functional <em>Choose file…</em> and selected file name text.
            </p>
            <div className="input-group">
              <input
                type="file"
                className="form-control"
                id="customFile"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </div>
            {selectedFile && (
              <p className="mt-2">
                Selected file: <strong>{selectedFile.name}</strong>
              </p>
            )}
          </CardBody>
        </Card>
      </Col>
    </Row>
      
      </Container>
    </div>
  );
});

export default BasicInfoForm;
