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

const CreateServices = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
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

    const handleSubmit = () => {
        console.log("formData formData",formData);
        // dispatch(saveRoomCategoryReq());
        // toastr.success("Category Saved Successfully!");
    }

    const [inputError, setInputError] = useState(false);
    const [inputValue, setInputValue] = useState();

    // useEffect(() => {
    //     setInputValue(defaultVal);
    // }, [defaultVal]);


    // const handleInputChange = (e) => {
    //     const inputVal = e.target.value;
    //     setInputValue(inputVal); // Update inputValue state with the new input value
    //     setInputError(inputVal.trim() === ""); // Check for input validation here if needed
    //     // onChange(fieldName, inputVal); // Pass the current input value to the parent component
    // };

    const handleInputChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value
        });
    };

    const handleSelectChange = (fieldName, selectedOption) => {
        handleInputChange(fieldName, selectedOption);
    };

    const handleDateChange = (date, fieldName) => {
        // date parameter is an array with the selected date, extract the first element
        const selectedDate = date[0];

        setFormData({
            ...formData,
            [fieldName]: selectedDate
        });
    };

    const handleRadioChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value
        });
    };

    // const handleSelectChange = (selectedOption) => {

    //     if (Array.isArray(selectedOption)) {
    //         // Multi-selector input box
    //         // Extract values from selected options
    //         //   const selectedValues = selectedOption.map((option) => option.value);
    //         // Pass the array of selected values to the parent component
    //         //   onChange(fieldName, selectedValues);
    //         // Set input error based on whether any option is selected or not
    //         setInputError(selectedOption.length === 0);
    //         // Update the defaultValue state with the selected options
    //         //   setDefaultValue(selectedOption);

    //     } else {
    //         // Single selector input box
    //         // Pass the single selected value to the parent component
    //         //   onChange(fieldName, selectedOption ? selectedOption.value : null);
    //         // Set input error based on whether the option is selected or not
    //         setInputError(!selectedOption);
    //         // Update the defaultValue state with the single selected option
    //         //   setDefaultValue(selectedOption);
    //     }
    // };



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

    return (
        <div className="page-content">
            <Card>
                <CardBody>
                    <Container fluid={true}>
                        <Form >
                            <Row>
                                <Col lg="6">
                                    <Row className="d-flex flex-row mb-3">
                                        <Label htmlFor={1} className="d-flex flex-row col-md-2 col-form-label">Name</Label>
                                        <Col className="col-md-10">
                                            <Input
                                                type="text"
                                                placeholder="Enter Service Name"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                required
                                                invalid={inputError}
                                            />
                                            {inputError && <FormFeedback>Enter Service Name</FormFeedback>}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg="6">
                                    <Row className="mb-3">
                                        <Label className="col-md-2 col-form-label">Price Type</Label>
                                        <Col className={`col-md-10`}>
                                            <Select
                                                className={`${inputError ? "is-invalid" : ""}`}
                                                // value={defaultValue}
                                                placeholder="Select Price Type"
                                                value={formData.priceType}
                                                onChange={(selectedOption) => handleSelectChange('priceType', selectedOption)}
                                                options={options}
                                                classNamePrefix="select2-selection"
                                            // isMulti={isMulti}
                                            />
                                            {inputError && <FormFeedback>Please Select Price Type</FormFeedback>}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="6">
                                    <Row className="d-flex flex-row mb-3">
                                        <Label htmlFor={1} className="d-flex flex-row col-md-2 col-form-label">Price</Label>
                                        <Col className="col-md-10">
                                            <Input
                                                type="number"
                                                placeholder="Enter Price"
                                                value={formData.number}
                                                onChange={(e) => handleInputChange('number', e.target.value)}
                                                required
                                                invalid={inputError}
                                            />
                                            {inputError && <FormFeedback>Enter Service Name</FormFeedback>}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg="6">
                                    <Row className="mb-3">
                                        <Label className="col-md-2 col-form-label">Tax</Label>
                                        <Col className={`col-md-10`}>
                                            <Select
                                                className={`${inputError ? "is-invalid" : ""}`}
                                                placeholder="Select Tax"
                                                value={formData.tax}
                                                onChange={(selectedOption) => handleSelectChange('tax', selectedOption)}
                                                options={options}
                                                classNamePrefix="select2-selection"
                                            // isMulti={isMulti}
                                            />
                                            {inputError && <FormFeedback>Please Select Tax</FormFeedback>}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="6">
                                    <Row className="mb-3">
                                        <Label className="col-md-2 col-form-label">Start Date</Label>
                                        <Col className={`col-md-10`}>
                                            <Flatpickr
                                                className="form-control d-block"
                                                placeholder="dd M,yyyy"
                                                options={{
                                                    altInput: true,
                                                    altFormat: "F j, Y",
                                                    dateFormat: "Y-m-d"
                                                }}
                                                onChange={(date) => handleDateChange(date, 'startDate')}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg="6">
                                    <Row className="mb-3">
                                        <Label className="col-md-2 col-form-label">End Date</Label>
                                        <Col className={`col-md-10`}>
                                            <Flatpickr
                                                className="form-control d-block"
                                                placeholder="dd M,yyyy"
                                                options={{
                                                    altInput: true,
                                                    altFormat: "F j, Y",
                                                    dateFormat: "Y-m-d"
                                                }}
                                                onChange={(date) => handleDateChange(date, 'endDate')}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="6">
                                    <Row className="d-flex flex-row mb-3">
                                        <Label className="d-flex flex-row col-md-2 col-form-label">Mandatory *</Label>
                                        <Col className="col-md-10  d-flex flex-row align-items-center justify-content-start">
                                            <div>
                                                <Input
                                                    name="mandatory"
                                                    type="radio"
                                                    value="true"
                                                    onChange={(e) => handleRadioChange('mandatory', e.target.value === 'true')}
                                                />
                                                {' '}
                                                <Label check className='mx-2'>
                                                    Yes
                                                </Label>
                                            </div>
                                            <div>
                                                <Input

                                                    name="mandatory"
                                                    type="radio"
                                                    value="false"
                                                    onChange={(e) => handleRadioChange('mandatory', e.target.value === 'true')}
                                                />
                                                {' '}
                                                <Label check className='mx-2'>
                                                    No
                                                </Label>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg="6">
                                    <Row className="d-flex flex-row mb-3">
                                        <Label className="d-flex flex-row col-md-2 col-form-label">Release </Label>
                                        <Col className="col-md-10  d-flex flex-row align-items-center justify-content-start">
                                            <div>
                                                <Input                                                   
                                                    type="radio"
                                                    name="release"
                                                    value="published"
                                                    onChange={(e) => handleRadioChange('release', e.target.value)}
                                                />
                                                {' '}
                                                <Label check className='mx-2'>
                                                    Published
                                                </Label>
                                            </div>

                                            <div>
                                                <Input
                                                    type="radio"
                                                    name="release"
                                                    value="not-published"
                                                    onChange={(e) => handleRadioChange('release', e.target.value)}
                                                />
                                                {' '}
                                                <Label check className='mx-2'>
                                                    Not published
                                                </Label>
                                            </div>

                                            <div>
                                                <Input
                                                    type="radio"
                                                    name="release"
                                                    value="awaiting"
                                                    onChange={(e) => handleRadioChange('release', e.target.value)}
                                                />
                                                {' '}
                                                <Label check className='mx-2'>
                                                    Awaiting
                                                </Label>
                                            </div>

                                            <div>
                                                <Input
                                                    type="radio"
                                                    name="release"
                                                    value="archived"
                                                    onChange={(e) => handleRadioChange('release', e.target.value)}
                                                />
                                                {' '}
                                                <Label check className='mx-2'>
                                                    Archived
                                                </Label>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="6">
                                    <Row className="mb-3">
                                        <Label className="col-md-2 col-form-label">Room</Label>
                                        <Col className={`col-md-10`}>
                                            <Select
                                                className={`${inputError ? "is-invalid" : ""}`}
                                                placeholder="Select Room"
                                                value={formData.room}
                                                onChange={(selectedOption) => handleSelectChange('room', selectedOption)}
                                                options={options}
                                                classNamePrefix="select2-selection"
                                            // isMulti={isMulti}
                                            />
                                            {inputError && <FormFeedback>Please Select Room</FormFeedback>}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <FormGroup className="mb-0">
                                <div>
                                    <Button type="submit" color="primary" className="me-1" onClick={handleSubmit}>
                                        Submit
                                    </Button>{" "}
                                </div>
                            </FormGroup>
                        </Form>
                    </Container>
                </CardBody>
            </Card>
        </div>
    )
}

export default CreateServices
