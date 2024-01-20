/* eslint-disable default-case */
import { AvForm } from "availity-reactstrap-validation";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Card, CardBody, Container, Button } from "reactstrap";
import {
  TextInput,
  EmailInput,
  SearchInput,
  UrlInput,
  TelephoneInput,
  PasswordInput,
  NumberInput,
  DateTimeLocalInput,
  DateInput,
  MonthInput,
  WeekInput,
  TimeInput,
  ColorInput,
  // SelectorInput,
  ChooseFileInput,
  SelectInput,
  CkEditor,
} from "../FormComponents/index";
import RadioButton from "../FormComponents/RadioButton";
import ImageViewer from "../FormComponents/ImageViewer";
// import CkEditor from '../FormComponents/CkEditor';

const GenricForm = (props, { formfields, onChange, onSubmit }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);
  const handleGalleryFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setGallery([...gallery, ...selectedFiles]);

    props.onChange("gallery", [...gallery, ...selectedFiles]);
  };

  const handleThumbnailFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setThumbnail(selectedFile);
    props.onChange("thumbnail", selectedFile);
  };

  const removeGalleryFile = (index) => {
    const updatedGallery = [...gallery];
    updatedGallery.splice(index, 1);
    setGallery(updatedGallery);
    props.onChange("gallery", updatedGallery);
  };

  const removeThumbnailFile = () => {
    setThumbnail(null);
    props.onChange("thumbnail", null);
  };

  
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(props.formfields.backToList);
  };


  const handleFieldChange = (name, value) => {
    // If CKEditor field, use the custom onChange function
    if (name === 'description' && props.formfields.form.find(field => field.name === 'description')) {
      props.formfields.form.find(field => field.name === 'description').onChange(name, value);
    } else {
      // Otherwise, use the provided onChange function
      props.onChange(name, value);
    }
    // props.onChange(name, value);
  };

  const handleSubmit = () => { };
  return (
    <div>
      <Form>
        {/* <Card>
          <CardBody> */}
            <Row className="align-items-center  d-flex mb-3 rounded bg-subbar border border-info">
              <Col
                xs="12"
                md="12"
                className="mb-2 d-md-flex justify-content-md-start"
              >
                <Button
                  type="button"
                  color="warning"
                  className="btn-rounded me-2 mt-2 text-black"
                  onClick={handleNavigate}
                >
                  <i className="mdi mdi-arrow-left me-1" />
                  Back to List
                </Button>
              </Col>
            </Row>

            <AvForm
              id="validationCustomForm"
              className="needs-validation"
              onSubmit={handleSubmit}
              noValidate
            >
              <Row className="mb-3">
                {props.formfields &&
                  Object.keys(props.formfields.form).map((key) => {
                    const fieldConfig = props.formfields.form[key];
                    // console.log(fieldConfig);
                    switch (fieldConfig.type) {
                      case "text":
                        return (
                          <Col key={fieldConfig.fieldName} lg="6">
                            <TextInput
                              label={fieldConfig.fieldName}
                              id={fieldConfig.fieldName}
                            />
                          </Col>
                        );
                      case "email":
                        return (
                          <Col key={fieldConfig.fieldName} lg="6">
                            <EmailInput
                              label={fieldConfig.fieldName}
                              validate={fieldConfig.required}
                            />
                          </Col>
                        );
                      case "search":
                        return (
                          <Col key={fieldConfig.fieldName} lg="6">
                            <SearchInput />
                          </Col>
                        );
                      case "url":
                        return (
                          <Col key={fieldConfig.fieldName} lg="6">
                            <UrlInput />
                          </Col>
                        );
                      case "telephone":
                        return (
                          <Col key={fieldConfig.fieldName} lg="6">
                            <TelephoneInput />
                          </Col>
                        );
                      case "password":
                        return (
                          <Col key={fieldConfig.fieldName} lg="6">
                            <PasswordInput />
                          </Col>
                        );
                      case "number":
                        return (
                          <Col key={fieldConfig.fieldName} lg="6">
                            {/* <NumberInput label={fieldConfig.label} /> */}
                            <NumberInput label={fieldConfig.label} id={fieldConfig.name} onChange={handleFieldChange} />

                          </Col>
                        );
                      case "datetime":
                        return (
                          <Col key={fieldConfig.fieldName} lg="6">
                            <DateTimeLocalInput />
                          </Col>
                        );
                      case "date":
                        return (
                          <Col key={fieldConfig.fieldName} lg="6">
                            <DateInput />
                          </Col>
                        );
                      case "month":
                        return (
                          <Col key={fieldConfig.fieldName} lg="6">
                            <MonthInput />
                          </Col>
                        );
                      case "week":
                        return (
                          <Col key={fieldConfig.fieldName} lg="6">
                            <WeekInput />
                          </Col>
                        );
                      case "time":
                        return (
                          <Col key={fieldConfig.fieldName} lg="6">
                            <TimeInput />
                          </Col>
                        );
                      case "color":
                        return (
                          <Col key={fieldConfig.fieldName} lg="6">
                            <ColorInput />
                          </Col>
                        );
                      case "upload":
                        return (
                          <Col key={fieldConfig.fieldName} lg="6">
                            <ChooseFileInput label={fieldConfig.fieldName} />
                          </Col>
                        );
                      case "select":
                        return (
                          <Col lg="6">
                            <SelectInput
                              label={fieldConfig.label}
                              options={fieldConfig.options}
                              onChange={props.onChange}
                            />
                          </Col>
                        );
                      case "ckeditor":
                        return (
                          <Col lg="12">
                            <CkEditor
                              label={fieldConfig.label}
                              options={fieldConfig.options}
                              id={fieldConfig.name}
                              onChange={handleFieldChange}
                            />
                          </Col>
                        );
                      case "radio":
                        return (
                          <Col lg="6">
                            <RadioButton
                              label={fieldConfig.label}
                              options={fieldConfig.options}
                            />
                          </Col>
                        );
                    }
                  })}
              </Row>

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
          {/* </CardBody>
        </Card> */}
      </Form>
    </div>
  );
};

export default GenricForm;
