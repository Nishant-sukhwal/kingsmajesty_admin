import React, { useState } from "react";
import { Button, Card, CardBody, Container } from "reactstrap";
import GenralForm from "../../components/Form/GenricForm/GenralForm";
import { useDispatch } from "react-redux";
import { saveDeals } from "../../store/deals/actions";
import SubHeader from "../../components/Common/SubHeader";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

const CreateDeals = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
  });
  console.log(formData);

  const formFields = {
    backbutton: "/deals",
    form: [
      {
        fieldName: "name",
        label: "Name",
        type: "text",
        errorMessage: "Enter Deal",
        placeholder: "Enter Deal Name",
      },
    ],
  };

  const handleFormChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = () => {
    dispatch(saveDeals(formData))
    toastr.success('Deal created successfully!', 'Success');
  };

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Card>
          <CardBody>
            <SubHeader value={'/deals'} />
            <GenralForm formFields={formFields} onChange={handleFormChange} />
            <Button color="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default CreateDeals;
