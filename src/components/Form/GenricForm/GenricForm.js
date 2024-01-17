import { AvForm } from 'availity-reactstrap-validation';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Row,
    Col,
    Form,
    Card,
    CardBody,
    Container,
    Button,
} from "reactstrap";
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
    SelectorInput,
    ChooseFileInput
} from '../FormComponents/index'



const GenricForm = (props) => {
    console.log(props);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(props.formModule.backToList);
    }

    const handleSubmit = () => {

    }
    return (
        <div>
            <Form>
                <Card>
                    <CardBody>
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

                            {/* <Row>
                                <Col lg="6">
                                    <TextInput
                                        name="Facility"
                                        placeholder="Facility Name"
                                        errorMessage="Enter Facility Name"
                                        validation={validation.facilityName}
                                        onChange={(e) => handleInputChange(e, "facilityName")}
                                    />
                                </Col>
                                <Col lg="6">
                                    <ChooseFileInput
                                        label="Choose Media"
                                        id="inputGroupFile01"
                                        onChange={handleFileChange}
                                    />
                                </Col>
                            </Row> */}

                            <Row className="mb-3">
                                {props.formModule && Object.keys(props.formModule.form).map((key) => {
                                    const fieldConfig = props.formModule.form[key];
                                    switch (fieldConfig.type) {
                                        case 'text':
                                            return (
                                                <Col key={fieldConfig.fieldName} lg="6">
                                                    <TextInput label={fieldConfig.fieldName} id={fieldConfig.fieldName}/>
                                                </Col>
                                            )
                                        case 'email':
                                            return (
                                                <Col key={fieldConfig.fieldName} lg="6">
                                                    <EmailInput label={fieldConfig.fieldName} validate={fieldConfig.required}  />
                                                </Col>
                                            )
                                        case 'search':
                                            return (
                                                <Col key={fieldConfig.fieldName} lg="6">
                                                    <SearchInput />
                                                </Col>
                                            )
                                        case 'url':
                                            return (
                                                <Col key={fieldConfig.fieldName} lg="6">
                                                    <UrlInput />
                                                </Col>
                                            )
                                        case 'telephone':
                                            return (
                                                <Col key={fieldConfig.fieldName} lg="6">
                                                    <TelephoneInput />
                                                </Col>
                                            )
                                        case 'password':
                                            return (
                                                <Col key={fieldConfig.fieldName} lg="6">
                                                    <PasswordInput />
                                                </Col>
                                            )
                                        case 'number':
                                            return (
                                                <Col key={fieldConfig.fieldName} lg="6">
                                                    <NumberInput />
                                                </Col>
                                            )
                                        case 'datetime':
                                            return (
                                                <Col key={fieldConfig.fieldName} lg="6">
                                                    <DateTimeLocalInput />
                                                </Col>
                                            )
                                        case 'date':
                                            return (
                                                <Col key={fieldConfig.fieldName} lg="6">
                                                    <DateInput />
                                                </Col>
                                            )
                                        case 'month':
                                            return (
                                                <Col key={fieldConfig.fieldName} lg="6">
                                                    <MonthInput />
                                                </Col>
                                            )
                                        case 'week':
                                            return (
                                                <Col key={fieldConfig.fieldName} lg="6">
                                                    <WeekInput />
                                                </Col>
                                            )
                                        case 'time':
                                            return (
                                                <Col key={fieldConfig.fieldName} lg="6">
                                                    <TimeInput />
                                                </Col>
                                            )
                                        case 'color':
                                            return (
                                                <Col key={fieldConfig.fieldName} lg="6">
                                                    <ColorInput />
                                                </Col>
                                            )
                                        case 'upload':
                                            return (
                                                <Col key={fieldConfig.fieldName} lg="6">
                                                    <ChooseFileInput label={fieldConfig.fieldName} />
                                                </Col>
                                            )
                                    }
                                }
                                )
                                }                                
                            </Row>

                            {/* {props.formModule &&
                                Object.keys(props.formModule.form).map((key) => (
                                    <Row key={key}>
                                        <Col lg="12" className="d-flex flex-row-reverse">
                                            <Button type="submit" className="bg-info text-dark" onClick={handleSubmit}>
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                ))} */}


                            <Row>
                                <Col lg="12" className="d-flex flex-row-reverse">
                                    <Button type="submit" className="bg-info text-dark" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </AvForm>
                    </CardBody>
                </Card>
            </Form>
        </div>
    )
}

export default GenricForm;