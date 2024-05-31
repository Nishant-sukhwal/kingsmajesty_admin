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
import { createServiceApi } from '../../services/api/servicesApi';
import ChooseFileInput from '../../components/Form/FormComponent/ChooseFileInput';


const CreatePackages = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    console.log("formData update ", formData);

    const handleFieldChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const options = [
        { value: "Night", label: "Person" },
        { value: "Person", label: "Night" },
        { value: "Person/night", label: "Person/night" },
        { value: "Adult", label: "Adult" },
        { value: "Adult/night", label: "Adult/night" },
        { value: "Child", label: "Child" },
        { value: "Child/night", label: "Child/night" },
        { value: "Fixed price", label: "Fixed price" },
        { value: "Quantity", label: "Quantity" },
        { value: "Quantity/night", label: "Quantity/night" },
        { value: "Quantity/person/night", label: "Quantity/person/night" },
        { value: "Quantity/adult/night", label: "Quantity/adult/night" },
        { value: "Quantity/child/night", label: "Quantity/child/night" }
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
        // try {
        //     const res = await createServiceApi(formData);
        //     console.log(res);
        //     toastr.success(res.data.message);
        // } catch (error) {
        //     toastr.error("Category Saved Successfully!");
        // }
    }

    return (
        <div className="page-content">
            <Card>
                <CardBody>
                    <SubHeader value={"/packages"} />
                    <Container fluid={true}>

                        <Row>
                            <Col key="title" lg="6">
                                <TextInput
                                    label="Title"
                                    fieldName="title"
                                    errorMessage="Enter package title"
                                    value={formData.title}
                                    placeholder="Enter package title"
                                    onChange={handleFieldChange}
                                    defaultVal={formData.title}
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
                            <Col key="price" lg="6">
                                <NumberInput
                                    label="Price"
                                    fieldName="price"
                                    errorMessage="Enter price"
                                    value={formData.name}
                                    placeholder="Enter price"
                                    onChange={handleFieldChange}
                                // defaultVal={formData.description}
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
                                    // defaultVal={formData.startDate}
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
                                    // defaultVal={formData.endDate}
                                    onChange={handleFieldChange}
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
                            <Col key="media" lg="6">
                                <ChooseFileInput
                                    label="Media"
                                    fieldName="media"
                                    onChange={handleFieldChange}
                                    errorMessage="Select File"
                                    imageViewer="true"
                                // defaultVal=''                            
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

export default CreatePackages
