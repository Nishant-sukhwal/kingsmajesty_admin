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
import AddressInput from '../../components/Form/FormComponent/AddressInput';

// import CkEditor from "../FormComponent/CkEditor";

const CreateBookingForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        hotel: '',
        checkInDate: '',
        checkOutDate: '',
        nights: '',
        adults: '',
        children: '',
        discount: '',
        downPayment: '',
        exTaxTotal: '',
        taxAmount: '',
        total: '',
        comments: '',
        room: [{ hotel: '', room: '', adults: '', children: '', taxrate: '', amount: '' }],


        // customer: '',
        // title: '',
        // subtitle: '',
        // description: '',
        // maxchildren: '',
        // maxadults: '',
        // maxpeople: '',
        // price_per_person: '', 
        // duration: '',
        // duration_unit: '',
        // homepage: false,
        // release: '',

    });
    console.log("formData update ", formData);




    const handleFieldChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    // const handleNestedFieldChange = (index, fieldName, value) => {
    //     console.log(index, fieldName, value);
    //     const updatedFormData = { ...formData };
    //     updatedFormData.room[index][fieldName] = value;
    //     setFormData(updatedFormData);

    // };
    const handleNestedFieldChange = (index, fieldName, value) => {
        console.log(index, fieldName, value)
        setFormData(prevFormData => {
            const updatedRoom = [...prevFormData.room]; // Create a copy of the room array
            const updatedRoomItem = { ...updatedRoom[index] }; // Create a copy of the specific room item

            // Update the field in the copied room item
            updatedRoomItem[fieldName] = value;

            // Update the room array with the modified room item
            updatedRoom[index] = updatedRoomItem;

            // Return the updated form data object with the modified room array
            return {
                ...prevFormData,
                room: updatedRoom
            };
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



    const handleAddRoom = () => {
        const updatedFormData = { ...formData };
        updatedFormData.room.push({ hotel: '', room: '', adults: '', children: '', taxrate: '', amount: '' });
        setFormData(updatedFormData);
    };


    const handleDeleteRoom = (index) => {
        const updatedFormData = { ...formData };
        updatedFormData.room.splice(index, 1);
        setFormData(updatedFormData);
    };

    const handleAddBooking = () => {
        // Create a new room object with default values
        const newRoom = { hotel: '', roomType: '', adults: 1, amount: 1, taxRate: 0 };

        // Update the formData state to include the new room
        setFormData(prevFormData => ({
            ...prevFormData,
            room: [...prevFormData.room, newRoom]  // Add newRoom to the existing room array
        }));
    };



    return (
        <div className="page-content">
            <Card>
                <CardBody>
                    <SubHeader value={"/booking"} />
                    <Container fluid={true}>


                        <Row>
                            <Col key="hotel" lg="6">
                                <SelectInput
                                    label="Hotel"
                                    fieldName="hotel"
                                    options={options}
                                    onChange={handleFieldChange}
                                    errorMessage="Please Select hotels"
                                    placeholder="Select hotels"
                                // defaultVal={fieldConfig.defaultValue}
                                />
                            </Col>
                            {/* <Col key="customer" lg="6">
                                <SelectInput
                                    label="Customer"
                                    fieldName="customer"
                                    options={options}
                                    onChange={handleFieldChange}
                                    errorMessage="Please select a customer"
                                    placeholder="Select a customer"
                                />
                            </Col> */}
                        </Row>

                        <Row>
                            <Col key="checkIn" lg="6">
                                <DateInput
                                    label="Check-in"
                                    id="checkInDate"
                                    fieldName="checkInDate"
                                    errorMessage="Please select a check-in date"
                                    placeholder="dd M, yyyy"
                                    defaultVal={formData.checkInDate}
                                    onChange={handleFieldChange}
                                />
                            </Col>
                            <Col key="checkOut" lg="6">
                                <DateInput
                                    label="Checkout"
                                    id="checkOutDate"
                                    fieldName="checkOutDate"
                                    errorMessage="Please select a check-out date"
                                    placeholder="dd M, yyyy"
                                    defaultVal={formData.checkOutDate}
                                    onChange={handleFieldChange}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col key="nights" lg="6">
                                <NumberInput
                                    label="Nights"
                                    fieldName="nights"
                                    errorMessage="Enter number of nights"
                                    value={formData.nights}
                                    placeholder="Enter number of nights"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                            <Col key="adults" lg="6">
                                <NumberInput
                                    label="Adults"
                                    fieldName="adults"
                                    errorMessage="Enter adults"
                                    value={formData.adults}
                                    placeholder="Enter adults"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col key="children" lg="6">
                                <NumberInput
                                    label="Children"
                                    fieldName="children"
                                    errorMessage="Enter number of children"
                                    value={formData.children}
                                    placeholder="Enter number of children"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                            <Col key="discount" lg="6">
                                <NumberInput
                                    label="Discount"
                                    fieldName="discount"
                                    errorMessage="Enter discount percentage"
                                    value={formData.discount}
                                    placeholder="Enter discount percentage"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col key="downPayment" lg="6">
                                <NumberInput
                                    label="Down Payment"
                                    fieldName="downPayment"
                                    errorMessage="Enter down payment amount"
                                    value={formData.downPayment}
                                    placeholder="Enter down payment amount"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                            <Col key="exTaxTotal" lg="6">
                                <NumberInput
                                    label="Ex-tax Total"
                                    fieldName="exTaxTotal"
                                    errorMessage="Enter ex-tax total amount"
                                    value={formData.exTaxTotal}
                                    placeholder="Enter ex-tax total amount"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col key="taxAmount" lg="6">
                                <NumberInput
                                    label="Tax Amount"
                                    fieldName="taxAmount"
                                    errorMessage="Enter tax amount"
                                    value={formData.taxAmount}
                                    placeholder="Enter tax amount"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                            <Col key="total" lg="6">
                                <NumberInput
                                    label="Total"
                                    fieldName="total"
                                    errorMessage="Enter total amount"
                                    value={formData.total}
                                    placeholder="Enter total amount"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col key="paid" lg="6">
                                <NumberInput
                                    label="Paid"
                                    fieldName="paid"
                                    errorMessage="Enter paid amount"
                                    value={formData.paid}
                                    placeholder="Enter paid amount"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                            <Col key="balance" lg="6">
                                <NumberInput
                                    label="Balance"
                                    fieldName="balance"
                                    errorMessage="Enter balance amount"
                                    value={formData.balance}
                                    placeholder="Enter balance amount"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                        </Row>

                        <Row>
                            {/* <Col key="hotel" lg="6">
                                <SelectInput
                                    label="Hotel"
                                    fieldName="hotel"
                                    options={options}
                                    onChange={handleFieldChange}
                                    errorMessage="Please Select hotels"
                                    placeholder="Select hotels"
                                // defaultVal={fieldConfig.defaultValue}
                                />
                            </Col> */}
                            <Col key="customer" lg="6">
                                <SelectInput
                                    label="Customer"
                                    fieldName="customer"
                                    options={options}
                                    onChange={handleFieldChange}
                                    errorMessage="Please select a customer"
                                    placeholder="Select a customer"
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col key="firstName" lg="6">
                                <TextInput
                                    label="First Name"
                                    fieldName="firstName"
                                    errorMessage="Enter first name"
                                    value={formData.firstName}
                                    placeholder="Enter first name"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                            <Col key="lastName" lg="6">
                                <TextInput
                                    label="Last Name"
                                    fieldName="lastName"
                                    errorMessage="Enter last name"
                                    value={formData.lastName}
                                    placeholder="Enter last name"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col key="email" lg="6">
                                <TextInput
                                    label="E-mail"
                                    fieldName="email"
                                    errorMessage="Enter email"
                                    value={formData.email}
                                    placeholder="Enter email"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                            <Col key="mobile" lg="6">
                                <NumberInput
                                    label="Mobile"
                                    fieldName="mobile"
                                    errorMessage="Enter mobile number"
                                    value={formData.name}
                                    placeholder="Enter mobile number"
                                    onChange={handleFieldChange}
                                // defaultVal={formData.description}
                                />
                            </Col>
                            {/* <Col key="company" lg="6">
                                <TextInput
                                    label="Company"
                                    fieldName="company"
                                    errorMessage="Enter company"
                                    value={formData.company}
                                    placeholder="Enter company"
                                    onChange={handleFieldChange}
                                />
                            </Col> */}
                        </Row>

                        <Row>
                            <Col key="address" lg="6">
                                <TextInput
                                    label="Address"
                                    fieldName="address"
                                    errorMessage="Enter address"
                                    value={formData.address}
                                    placeholder="Enter address"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                            <Col key="city" lg="6">
                                <TextInput
                                    label="City"
                                    fieldName="city"
                                    errorMessage="Enter city"
                                    value={formData.city}
                                    placeholder="Enter city"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                            <Col key="state" lg="6">
                                <TextInput
                                    label="State"
                                    fieldName="state"
                                    errorMessage="Enter state"
                                    value={formData.state}
                                    placeholder="Enter state"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                            <Col key="postcode" lg="6">
                                <NumberInput
                                    label="Postcode"
                                    fieldName="postcode"
                                    errorMessage="Enter postcode"
                                    value={formData.postcode}
                                    placeholder="Enter postcode"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col key="address" lg="12">
                                <AddressInput
                                    label="Comments"
                                    fieldName="comments"
                                    errorMessage="Enter comments"
                                    value={formData.comments}
                                    placeholder="Enter comments"
                                    onChange={handleFieldChange}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col key="status" lg="6">
                                <SelectInput
                                    label="Status"
                                    fieldName="status"
                                    options={options}
                                    onChange={handleFieldChange}
                                    errorMessage="Please Select status"
                                    placeholder="Select status"
                                // defaultVal={fieldConfig.defaultValue}
                                />
                            </Col>
                            <Col key="payment_option" lg="6">
                                <SelectInput
                                    label="Payment option"
                                    fieldName="payment_option"
                                    options={options}
                                    onChange={handleFieldChange}
                                    errorMessage="Please select a payment option"
                                    placeholder="Select a payment option"
                                />
                            </Col>
                        </Row>

                        <Card>
                            <CardBody>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div style={{ fontWeight: 'bold', fontSize: '20px' }}>Rooms</div>
                                    <Button type="submit" color="primary" className="ms-3" style={{ width: '10%', minWidth: '50px' }} onClick={handleAddRoom}>
                                        + <span>Add Room</span>
                                    </Button>
                                </div>
                                <hr style={{
                                    width: '100%',
                                    margin: 'auto',
                                    borderTop: '1px solid gray',
                                    marginTop: '5px',
                                    marginBottom: '10px'
                                }} />
                                {formData.room.map((room, index) => (
                                    <div key={`room-${index}`}>
                                        <Row>
                                            <Col key="hotel" lg="6">
                                                <SelectInput
                                                    label="Hotel"
                                                    fieldName="hotel"
                                                    options={options}
                                                    // value={room.hotel}
                                                    onChange={(value) => handleNestedFieldChange(index, 'hotel', value)}
                                                    errorMessage="Please Select hotel"
                                                    placeholder="Select hotel"
                                                // defaultVal={fieldConfig.defaultValue}
                                                />
                                            </Col>
                                            <Col key="room" lg="6">
                                                <SelectInput
                                                    label="Room"
                                                    fieldName="room"
                                                    options={options}
                                                    onChange={handleFieldChange}
                                                    errorMessage="Please select room"
                                                    placeholder="Select room"
                                                />
                                            </Col>
                                            <Col key="adults" lg="6">
                                                <NumberInput
                                                    label="Adults"
                                                    fieldName="adults"
                                                    errorMessage="Enter adults "
                                                    // value={formData.}
                                                    placeholder="Enter adults"
                                                    onChange={handleFieldChange}
                                                // defaultVal={formData.description}
                                                />
                                            </Col>
                                            <Col key="children" lg="6">
                                                <NumberInput
                                                    label="Children"
                                                    fieldName="children"
                                                    errorMessage="Enter childrens"
                                                    // value={formData.}
                                                    placeholder="Enter childrens"
                                                    onChange={handleFieldChange}
                                                // defaultVal={formData.description}
                                                />
                                            </Col>
                                            <Col key="taxrate" lg="6">
                                                <NumberInput
                                                    label="Tax Rate"
                                                    fieldName="taxrate"
                                                    errorMessage="Enter Tax Rate"
                                                    value={formData.nights}
                                                    placeholder="Enter Tax Rate"
                                                    onChange={handleFieldChange}
                                                />
                                            </Col>
                                            <Col key="amount" lg="6">
                                                <NumberInput
                                                    label="Amount"
                                                    fieldName="amount"
                                                    errorMessage="Enter amount"
                                                    value={formData.adults}
                                                    placeholder="Enter amount"
                                                    onChange={handleFieldChange}
                                                />
                                            </Col>
                                            <Col>
                                                <Button type="button" color="danger" onClick={() => handleDeleteRoom(index)}>
                                                    Delete
                                                </Button>
                                            </Col>
                                        </Row>
                                        <hr /> {/* Optional: Add a line to separate room forms */}
                                    </div>
                                ))}
                            </CardBody>
                        </Card>





                        <Button type="submit" color="primary" className="me-1" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Container>
                </CardBody>
            </Card>
        </div>
    )
}

export default CreateBookingForm
