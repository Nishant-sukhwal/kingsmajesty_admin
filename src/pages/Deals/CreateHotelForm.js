// HotelCreateForm.js
import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';
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
    SelectInput
} from '../../components/Form/FormComponents';
import Breadcrumbs from '../../components/Common/Breadcrumb';
// import SubHeader from '../../components/Common/SubHeader';
// import TextInput from '../../components/Form/FormComponentsValidate/TextInput';
import { AvField, AvForm } from "availity-reactstrap-validation";
import CheckBox from '../../components/Form/FormComponentsValidate/CheckboxInput';
// import TextInput from '../../components/Form/FormTooltipValidation/TextInput';
import UserInput from '../../components/Form/FormTooltipValidation/UserInput';


const HotelCreateForm = () => {
    const [breadcrumbItems] = useState([
        { title: "KingMajesty", link: "/" },
        { title: "Create Hotel", link: "#" },
    ]);



    // Normal Input element Validation
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        state: "",
        city: "",
        zip: "",
        agree: false,
    });

    const [validation, setValidation] = useState({
        fnm: true,
        lnm: true,
        unm: true,
        city: true,
        stateV: true,
        agree: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const fieldsToValidate = ["firstname", "lastname", "state", "city", "zip"];

        fieldsToValidate.forEach((field) => {
            const value = formData[field];
            const isValid = value.trim() !== "";
            setValidation((prevValidation) => ({ ...prevValidation, [field]: isValid }));
        });

        const agreeCheckbox = document.getElementById("invalidCheck");
        setFormData((prevData) => ({ ...prevData, agree: agreeCheckbox.checked }));
        setValidation((prevValidation) => ({ ...prevValidation, agree: agreeCheckbox.checked }));

        document.getElementById("validationCustomForm").classList.add("was-validated");
    };

    const handleInputChange = (event, field) => {
        const { value } = event.target;
        setFormData((prevData) => ({ ...prevData, [field]: value }));
        setValidation((prevValidation) => ({ ...prevValidation, [field]: value.trim() !== "" }));
    };



    return (
        <div className="page-content">
            {/* <SubHeader/> */}
            <div className="hotel-create-form" >
                <Container fluid>
                    {/* <SubHeader/> */}
                    <Breadcrumbs title="Create Hotel" breadcrumbItems={breadcrumbItems} />
                    <Card>

                        <CardBody>
                            {/* Use TextInput Component */}
                            <AvForm id="validationCustomForm" className="needs-validation" onSubmit={handleSubmit} noValidate>
                                <Row>
                                <TextInput label="Text" id="example-text-input" defaultValue="Artisanal kale" />
                                    {/* <TextInput
                                        label='Hotel Name'                                        
                                        placeholder="First name"
                                        errorMessage="Enter your name"                                        
                                        onChange={handleInputChange}
                                        name='fnm'
                                        // defaultValue={'Enter Hotel name'}
                                        validation={true} // validation nahi karwana h to false bhejna hi pdega
                                    /> */}
                                </Row>

                                <AvField name="name" label="Name" required />

                                <Row>
                                    <Col lg="12">
                                        <CheckBox
                                            id="invalidCheck"
                                            label="Agree to terms and conditions"
                                            validation={validation.agree}
                                            onChange={handleInputChange}
                                        />
                                    </Col>
                                </Row>
                            </AvForm>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </div>
    );
};

export default HotelCreateForm;
