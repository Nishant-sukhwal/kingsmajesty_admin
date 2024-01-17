import React, { useState } from "react";
import GenericFormAvfield from "../../components/Form/GenricForm/GenricFormAvfield";
import { Card, CardBody, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useLocation } from "react-router-dom";


const CreateDeals = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Example: Extract parts of the path as breadcrumb items
  const getBreadcrumbItems = (path) => {
    const parts = path.split('/').filter((part) => part !== '');
    let breadcrumbItems = [{ title: 'Dashoboard', link: '/' }];

    parts.reduce((acc, part) => {
      acc += `${part}`;
      breadcrumbItems.push({ title: part, link: acc });
      return acc;
    }, '');

    return breadcrumbItems;
  };


  const [breadcrumbItems, setBreadcrumbItems] = useState(getBreadcrumbItems(currentPath));


  // const [breadcrumbItems] = useState([
  //   { title: "KingMajesty", link: "/" },
  //   { title: "Create Facilities", link: "#" },
  // ]);

  const handleSubmit = (event, errors, values) => {
    if (errors.length === 0) {
      // Handle form submission
      console.log("Form values:", values);
    }
  };

  //   const formFields = [
  //     { name: "name", label: "Name", required: true },
  //     {
  //       name: "media",
  //       label: "Media File",
  //       type: "file",
  //       accept: "image/*, video/*",
  //       required: false,
  //     },
  //   ];

  const formFields = [
    { name: "name", label: "Name", required: true },
    {
      name: "media",
      label: "Media File",
      type: "file",
      accept: "image/*, video/*",
      required: false,
    },
    { name: "date", label: "Date", type: "date", required: true },
    { name: "time", label: "Time", type: "time", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "selectField", label: "Select Field", type: "select", required: true },
    { name: "multiSelectField", label: "Multi-Select Field", type: "multiSelect", required: true },
    { name: "radioField", label: "Radio Field", type: "radio", required: true },
    { name: "checkboxField", label: "Checkbox Field", type: "checkbox", required: true },
    { name: "dropdownField", label: "Dropdown Field", type: "dropdown", required: true },
    { name: "description", label: "Description", type: "ckeditor", required: true },
    // Add more fields as needed
  ];

  const fieldOptions = {
    selectField: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      // Add more options as needed
    ],
    multiSelectField: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      // Add more options as needed
    ],
    radioField: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      // Add more options as needed
    ],
    dropdownField: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      // Add more options as needed
    ],
    // Add more options as needed for other fields
  };

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title={breadcrumbItems[breadcrumbItems.length - 2].title} breadcrumbItems={breadcrumbItems} />

        {/* <Breadcrumbs
          title="Create Facilities"
          breadcrumbItems={breadcrumbItems}
        /> */}


        <Card>
          <CardBody>
            
            <GenericFormAvfield fields={formFields} onSubmit={handleSubmit} fieldOptions={fieldOptions} />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default CreateDeals;
