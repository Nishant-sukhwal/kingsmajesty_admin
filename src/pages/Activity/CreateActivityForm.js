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
import CkEditor from '../../components/Form/FormComponent/CkEditor';
import { createActivityApi } from '../../services/api/activitiesApi';

// import CkEditor from "../FormComponent/CkEditor";

const CreateActivityForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
    
    });
    // const [formData, setFormData] = useState({
    //     title: '',
    //     subtitle: '',
    //     description: '',
    //     maxchildren: '',
    //     maxadults: '',
    //     maxpeople: '',
    //     price_per_person: '',
    //     duration: '',
    //     duration_unit: '',
    //     homepage: false,
    //     release: '',
        
    //     // Add other form fields as needed
    // });
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

    const handleSubmit = async () => {
        console.log(formData, "formData for api ")
        const res = await createActivityApi(formData);
        console.log(res);
    }

    return (
        <div className="page-content">
            <Card>
                <CardBody>
                    <SubHeader value={"/activities"} />
                    <Container fluid={true}>

                        <Row>
                            <Col key="title" lg="6">
                                <TextInput
                                    label="Title"
                                    fieldName="title"
                                    errorMessage="Enter name"
                                    value={formData.name}
                                    placeholder="Enter Name"
                                    onChange={handleFieldChange}
                                    // defaultVal={formData.name}
                                />
                            </Col>
                            <Col key="subtitle" lg="6">
                                <TextInput
                                    label="Subtitle"
                                    fieldName="subtitle"
                                    errorMessage="Enter Subtitle"
                                    value={formData.name}
                                    placeholder="Enter Subtitle"
                                    onChange={handleFieldChange}
                                    // defaultVal={formData.description}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col key="description" lg="12">
                                <CkEditor
                                    label="Description"
                                    fieldName="description"
                                    onChange={handleFieldChange}
                                // defaultVal={fieldConfig.defaultValue}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col key="maxchildren" lg="6">
                                <NumberInput
                                    label="Max children"
                                    fieldName="maxchildren"
                                    errorMessage="Enter Max children"
                                    value={formData.name}
                                    placeholder="Enter Max children"
                                    onChange={handleFieldChange}
                                    // defaultVal={formData.description}
                                />
                            </Col>
                            <Col key="maxadults" lg="6">
                                <NumberInput
                                    label="Max adults"
                                    fieldName="maxadults"
                                    errorMessage="Enter Max adults"
                                    value={formData.maxadults}
                                    placeholder="Enter Max adults"
                                    onChange={handleFieldChange}
                                    // defaultVal={formData.description}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col key="maxpeople" lg="6">
                                <NumberInput
                                    label="Max people"
                                    fieldName="maxpeople"
                                    errorMessage="Enter Max people"
                                    value={formData.maxpeople}
                                    placeholder="Enter Max people"
                                    onChange={handleFieldChange}
                                    // defaultVal={formData.description}
                                />
                            </Col>

                            <Col key="price_per_person" lg="6">
                                <NumberInput
                                    label="Price / person"
                                    fieldName="price_per_person"
                                    errorMessage="Enter price per person"
                                    value={formData.price_per_person}
                                    placeholder="Enter price per person"
                                    onChange={handleFieldChange}
                                    // defaultVal={formData.description}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col key="duration" lg="6">
                                <NumberInput
                                    label="Duration "
                                    fieldName="duration"
                                    errorMessage="Enter Duration "
                                    value={formData.duration}
                                    placeholder="Enter Duration"
                                    onChange={handleFieldChange}
                                    // defaultVal={formData.description}
                                />
                            </Col>

                            <Col key="duration_unit" lg="6">
                                <TextInput
                                    label="Duration unit"
                                    fieldName="duration_unit"
                                    errorMessage="Enter duration unit"
                                    value={formData.duration_unit}
                                    placeholder="Enter duration unit"
                                    onChange={handleFieldChange}
                                    // defaultVal={formData.description}
                                />
                            </Col>
                        </Row>

                          
                        <Row>
                            <Col key="homepage" lg="6">
                                <RadioButton
                                    label="Homepage"
                                    fieldName="homepage"
                                    errorMessage="Select option"
                                    value={formData.homepage}
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
                            <Col key="hotels" lg="6">
                                <SelectInput
                                    label="Price Type"
                                    fieldName="priceType"
                                    options={options}
                                    onChange={handleFieldChange}
                                    errorMessage="Please Select hotels"
                                    placeholder="Select hotels"
                                    isMulti='true'
                                // defaultVal={fieldConfig.defaultValue}
                                />
                            </Col>
                            {/* <Col key="price" lg="6">
                                <NumberInput
                                    label="Price"
                                    fieldName="price"
                                    errorMessage="Enter price"
                                    value={formData.name}
                                    placeholder="Enter price"
                                    onChange={handleFieldChange}
                                    defaultVal={formData.description}
                                />
                            </Col> */}
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

export default CreateActivityForm
