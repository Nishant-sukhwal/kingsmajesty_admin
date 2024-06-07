/* eslint-disable default-case */
import React from "react";
import { Button, Col, Row } from "reactstrap";
import TextInput from "../FormComponent/TextInput";
import SelectInput from "../FormComponent/SelectInput";
import ChooseFileInput from "../FormComponent/ChooseFileInput";
import CkEditor from "../FormComponent/CkEditor";
import NumberInput from "../FormComponent/NumberInput";
import { useNavigate } from "react-router-dom";
import AddressInput from "../FormComponent/AddressInput";
import EmailInput from "../FormComponent/EmailInput";
import RadioButton from "../FormComponent/RadioInput";
import TimeInput from "../FormComponent/TimeInput";
import MultiSelectInput from "../FormComponent/MultiSelectInput";
import PasswordInput from "../FormComponent/PasswordInput";
import SingleSelectInput from "../FormComponent/SingleSelectInput";

const GenralForm = ({ formFields, onChange }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(formFields.backbutton);
  };

  const handleFieldChange = (fieldName, value) => {
    onChange(fieldName, value);
  };

  return (
    <div>
      <Row className="mb-3">
        {formFields &&
          Object.keys(formFields.form).map((key) => {
            const fieldConfig = formFields.form[key];

            switch (fieldConfig.type) {
              case "text":
                return (
                  <Col key={fieldConfig.fieldName} lg="6">
                    <TextInput
                      label={fieldConfig.label}
                      fieldName={fieldConfig.fieldName}
                      errorMessage={fieldConfig.errorMessage}
                      value={fieldConfig.value}
                      placeholder={fieldConfig.placeholder}
                      onChange={handleFieldChange}
                      defaultVal={fieldConfig.defaultValue}
                    // defaultValue={fieldConfig.value}
                    />
                  </Col>
                );
              case "select":
                return (
                  <Col key={fieldConfig.fieldName} lg="6">
                    <SelectInput
                      label={fieldConfig.label}
                      fieldName={fieldConfig.fieldName}
                      options={fieldConfig.options}
                      onChange={handleFieldChange}
                      errorMessage={fieldConfig.errorMessage}
                      isMulti={fieldConfig.isMulti}
                      placeholder={fieldConfig.placeholder}
                      defaultVal={fieldConfig.defaultValue}
                    // categoryVal={fieldConfig.categoryValue}
                    />
                  </Col>
                );
              case "singleselect":
                return (
                  <Col key={fieldConfig.fieldName} lg="6">
                    <SingleSelectInput
                      label={fieldConfig.label}
                      fieldName={fieldConfig.fieldName}
                      options={fieldConfig.options}
                      onChange={handleFieldChange}
                      errorMessage={fieldConfig.errorMessage}
                      isMulti={fieldConfig.isMulti}
                      placeholder={fieldConfig.placeholder}
                      defaultVal={fieldConfig.defaultValue}
                    // categoryVal={fieldConfig.categoryValue}
                    />
                  </Col>
                );
              case "multiselect":
                return (
                  <Col key={fieldConfig.fieldName} lg="6">
                    <MultiSelectInput
                      label={fieldConfig.label}
                      fieldName={fieldConfig.fieldName}
                      options={fieldConfig.options}
                      onChange={handleFieldChange}
                      errorMessage={fieldConfig.errorMessage}
                      isMulti={fieldConfig.isMulti}
                      placeholder={fieldConfig.placeholder}
                      defaultVal={fieldConfig.defaultValue}
                    // categoryVal={fieldConfig.categoryValue}
                    />
                  </Col>
                );
              case "file":
                return (
                  <Col key={fieldConfig.fieldName} lg="6">
                    <ChooseFileInput
                      label={fieldConfig.label}
                      fieldName={fieldConfig.fieldName}
                      onChange={handleFieldChange}
                      errorMessage={fieldConfig.errorMessage}
                      value={fieldConfig.value}
                      isMulti={fieldConfig.isMulti}
                      defaultVal={fieldConfig.defaultValue}
                      imageViewer={fieldConfig.imageViewer}
                      multiple={fieldConfig.multiple}
                    />
                  </Col>
                );
              case "editor":
                return (
                  <Col key={fieldConfig.fieldName} lg="12">
                    <CkEditor
                      label={fieldConfig.label}
                      fieldName={fieldConfig.fieldName}
                      onChange={handleFieldChange}
                      defaultVal={fieldConfig.defaultValue}
                    />
                  </Col>
                );
              case "number":
                return (
                  <Col key={fieldConfig.fieldName} lg="6">
                    <NumberInput
                      label={fieldConfig.label}
                      fieldName={fieldConfig.fieldName}
                      onChange={handleFieldChange}
                      errorMessage={fieldConfig.errorMessage}
                      placeholder={fieldConfig.placeholder}
                      value={fieldConfig.value}
                      defaultVal={fieldConfig.defaultValue}
                      maxLength={fieldConfig.maxLength}
                    />
                  </Col>
                );
              case "address":
                return (
                  <Col key={fieldConfig.fieldName} lg="12">
                    <AddressInput
                      label={fieldConfig.label}
                      fieldName={fieldConfig.fieldName}
                      errorMessage={fieldConfig.errorMessage}
                      value={fieldConfig.value}
                      placeholder={fieldConfig.placeholder}
                      onChange={handleFieldChange}
                      defaultVal={fieldConfig.defaultValue}
                    />
                  </Col>
                );
              case "email":
                return (
                  <Col key={fieldConfig.fieldName} lg="6">
                    <EmailInput
                      label={fieldConfig.label}
                      fieldName={fieldConfig.fieldName}
                      errorMessage={fieldConfig.errorMessage}
                      value={fieldConfig.value}
                      placeholder={fieldConfig.placeholder}
                      onChange={handleFieldChange}
                      defaultVal={fieldConfig.defaultValue}
                    />
                  </Col>
                );
              case "radio":
                return (
                  <Col key={fieldConfig.fieldName} lg="6">
                    <RadioButton
                      label={fieldConfig.label}
                      fieldName={fieldConfig.fieldName}
                      errorMessage={fieldConfig.errorMessage}
                      value={fieldConfig.value}
                      placeholder={fieldConfig.placeholder}
                      onChange={handleFieldChange}
                      options={fieldConfig.options}
                      defaultVal={fieldConfig.defaultValue}
                    />
                  </Col>
                );
              case "time":
                return (
                  <Col key={fieldConfig.fieldName} lg="6">
                    <TimeInput
                      label={fieldConfig.label}
                      fieldName={fieldConfig.fieldName}
                      errorMessage={fieldConfig.errorMessage}
                      value={fieldConfig.value}
                      placeholder={fieldConfig.placeholder}
                      onChange={handleFieldChange}
                      defaultVal={fieldConfig.defaultValue}
                    />
                  </Col>
                );
              case "date":
                return (
                  <Col key={fieldConfig.fieldName} lg="6">
                    <TimeInput
                      label={fieldConfig.label}
                      fieldName={fieldConfig.fieldName}
                      errorMessage={fieldConfig.errorMessage}
                      value={fieldConfig.value}
                      placeholder={fieldConfig.placeholder}
                      onChange={handleFieldChange}
                      defaultVal={fieldConfig.defaultValue}
                    />
                  </Col>
                );
              case "password":
                return (
                  <Col key={fieldConfig.fieldName} lg="6">
                    <PasswordInput
                      label={fieldConfig.label}
                      fieldName={fieldConfig.fieldName}
                      errorMessage={fieldConfig.errorMessage}
                      value={fieldConfig.value}
                      placeholder={fieldConfig.placeholder}
                      onChange={handleFieldChange}
                      defaultVal={fieldConfig.defaultValue}
                    />
                  </Col>
                );
              default:
                return null; // Return null for the default case
            }
          })}
      </Row>
    </div>
  );
};

export default GenralForm;
