import React, { useEffect, useState } from 'react'
import { Row, Col, Card, CardBody, FormGroup, Button, Label, Input, Container, InputGroup, Form, FormFeedback } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useDispatch } from 'react-redux'
import { saveRoomCategoryReq } from '../../store/roomCategory/actions'
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Select from "react-select";
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_green.css";
import SubHeader from '../../components/Common/SubHeader'
import TextInput from '../../components/Form/FormComponent/TextInput';
import SelectInput from '../../components/Form/FormComponent/SelectInput';
import DateInput from '../../components/Form/FormComponent/DateInput';
import RadioButton from '../../components/Form/FormComponent/RadioInput';
import NumberInput from '../../components/Form/FormComponent/NumberInput';

const EditService = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        priceType: null,
        price: '',
        tax: null,
        startDate: null,
        endDate: null,
        mandatory: false,
        release: '',
        room: null
        // Add other form fields as needed
    });
    console.log("formData update ", formData);




    const handleFieldChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const options = [
        { value: "night", label: "Night" },
        { value: "person", label: "Person" },
        { value: "person-night", label: "Person/night" },
        { value: "adult", label: "Adult" },
        { value: "adult-night", label: "Adult/night" },
        { value: "child", label: "Child" },
        { value: "child-night", label: "Child/night" },
        { value: "package", label: "Fixed price" },
        { value: "qty", label: "Quantity" },
        { value: "qty-night", label: "Quantity/night" },
        { value: "qty-person-night", label: "Quantity/person/night" },
        { value: "qty-adult-night", label: "Quantity/adult/night" },
        { value: "qty-child-night", label: "Quantity/child/night" }
    ];


    const taxOptions = [
        { value: "VAT-10", label: "VAT-10" },
        { value: "VAT-12", label: "VAT-12" },
        { value: "VAT-18", label: "VAT-18" },
        { value: "GST-5", label: "GST-5" },
        { value: "GST-12", label: "GST-12" },
        { value: "GST-18", label: "GST-18" },
        { value: "LuxuryTax-8", label: "Luxury Tax-8%" },
        { value: "LuxuryTax-12", label: "Luxury Tax-12%" },
        { value: "ServiceCharge-10", label: "Service Charge-10%" },
        { value: "ServiceCharge-12", label: "Service Charge-12%" }
    ];



    const mandatoryOptions = ["Yes", "No"];
    const releaseOptions = ["Published", "NotPublished", "Awaiting", "Archived"];

    const handleSubmit = () => {
        console.log(formData, "formData for api ")
    }

    return (
        <div className="page-content">
            <Card>
                <CardBody>
                    <Container fluid={true}>

                        <Row>
                            <Col key="name" lg="6">
                                <TextInput
                                    label="Name"
                                    fieldName="name"
                                    errorMessage="Enter name"
                                    value={formData.name}
                                    placeholder="Enter Name"
                                    onChange={handleFieldChange}
                                    defaultVal={formData.name}
                                />
                            </Col>
                            <Col key="description" lg="6">
                                <TextInput
                                    label="Description"
                                    fieldName="description"
                                    errorMessage="Enter description"
                                    value={formData.name}
                                    placeholder="Enter description"
                                    onChange={handleFieldChange}
                                    defaultVal={formData.description}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col key="price" lg="6">
                                <NumberInput
                                    label="Price"
                                    fieldName="price"
                                    errorMessage="Enter price"
                                    value={formData.name}
                                    placeholder="Enter price"
                                    onChange={handleFieldChange}
                                    defaultVal={formData.description}
                                />
                            </Col>
                            <Col key="priceType" lg="6">
                                <SelectInput
                                    label="Price Type"
                                    fieldName="priceType"
                                    options={options}
                                    onChange={handleFieldChange}
                                    errorMessage="Please Select Price Type"
                                    placeholder="Select Price Type"
                                // defaultVal={fieldConfig.defaultValue}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col key="startDate" lg="6">
                                <DateInput
                                    label="Start Date"
                                    id="startDate"
                                    fieldName="startDate"
                                    errorMessage="Please select a start date"
                                    placeholder="dd M, yyyy"
                                    defaultVal={formData.startDate}
                                    onChange={handleFieldChange}
                                />
                            </Col>
                            <Col key="endDate" lg="6">
                                <DateInput
                                    label="End Date"
                                    id="endDate"
                                    fieldName="endDate"
                                    errorMessage="Please select a start date"
                                    placeholder="dd M, yyyy"
                                    defaultVal={formData.endDate}
                                    onChange={handleFieldChange}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col key="mandatory" lg="6">
                                <RadioButton
                                    label="Mandatory"
                                    fieldName="mandatory"
                                    errorMessage="Select option"
                                    value={formData.mandatory}
                                    placeholder="Please Select option"
                                    onChange={handleFieldChange}
                                    options={mandatoryOptions}
                                // defaultVal={formData.mandatory}
                                />
                            </Col>
                            <Col key="release" lg="6">
                                <RadioButton
                                    label="Release"
                                    fieldName="release"
                                    errorMessage="Select option"
                                    value={formData.release}
                                    placeholder="Please Select option"
                                    onChange={handleFieldChange}
                                    options={releaseOptions}
                                // defaultVal={formData.mandatory}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col key="tax" lg="6">
                                <SelectInput
                                    label="Tax"
                                    fieldName="tax"
                                    options={taxOptions}
                                    onChange={handleFieldChange}
                                    errorMessage="Please Select tax type"
                                    placeholder="Select tax type"
                                // defaultVal={fieldConfig.defaultValue}
                                />
                            </Col>
                            <Col key="room" lg="6">
                                <SelectInput
                                    label="Room"
                                    fieldName="room"
                                    options={options}
                                    onChange={handleFieldChange}
                                    errorMessage="Please Select room"
                                    placeholder="Select room"
                                // defaultVal={fieldConfig.defaultValue}
                                />
                            </Col>
                        </Row>
                        <Button type="submit" color="primary" className="me-1" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Container>
                </CardBody>
            </Card>
        </div>
    )
}

export default EditService
