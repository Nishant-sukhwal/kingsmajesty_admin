import React, { useEffect, useState } from 'react'
import { Row, Col, Card, CardBody, FormGroup, Button, Label, Input, Container, InputGroup, Form, FormFeedback, Collapse, Table } from "reactstrap";
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
    // const [isOpen, setIsOpen] = useState(false);
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
        activities: [{ name: '', adults: '', duration: '', children: '', date: '', taxrate: '', amount: '', }],
        services: [{ name: '', quantity: '', duration: '', taxrate: '', amount: '', }],
        taxes: [{ name: '', amount: '', }],
        payments: [{ payment_method: '', date: '', tid: '', amount: '', }],
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


    const useToggle = (initialState) => {
        const [isOpen, setIsOpen] = useState(initialState);

        const toggle = () => {
            setIsOpen(!isOpen);
        }

        return [isOpen, toggle];
    };
    const [isOpen, toggleIsOpen] = useToggle(false);
    const [isOpen1, toggleIsOpen1] = useToggle(false);
    const [isOpen2, toggleIsOpen2] = useToggle(false);
    const [isOpen3, toggleIsOpen3] = useToggle(false);
    const [isOpen4, toggleIsOpen4] = useToggle(false);


    // const toggleCollapse = () => {
    //     setIsOpen(!isOpen);
    // };

    const handleFieldChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };
    const handleNestedFieldChange = (fieldName, value, index, arrayName) => {
        console.log('handleNestedFieldChange', fieldName, value, index, arrayName);
        setFormData((prevFormData) => {
            const updatedArray = [...prevFormData[arrayName]];
            const updatedItem = { ...updatedArray[index] };
            updatedItem[fieldName] = value;
            updatedArray[index] = updatedItem;

            return {
                ...prevFormData,
                [arrayName]: updatedArray,
            };
        });
    };
    // const handleNestedFieldChange = (fieldName, value, index, arrayName) => {
    //     console.log('handleNestedFieldChange', fieldName, value, index, arrayName)
    //     setFormData((prevFormData) => {
    //         const updatedArray = [...prevFormData[arrayName]];
    //         const updatedItem = { ...updatedArray[index] };
    //         updatedItem[fieldName] = value;
    //         updatedArray[index] = updatedItem;

    //         return {
    //             ...prevFormData,
    //             [arrayName]: updatedArray,
    //         };
    //     });
    // };

    const handleInputChange = (fieldName, value, index, arrayName) => {
        console.log(fieldName, value, index, arrayName)

        setFormData((prevFormData) => {
            const updatedArray = [...prevFormData[arrayName]];
            const updatedItem = { ...updatedArray[index] };
            updatedItem[fieldName] = value;
            updatedArray[index] = updatedItem;

            return {
                ...prevFormData,
                [arrayName]: updatedArray,
            };
        });
        // const inputVal = e.target.value;
        // setInputValue(inputVal); // Update inputValue state with the new input value
        // setInputError(inputVal.trim() === ""); // Check for input validation here if needed
        // onChange(fieldName, inputVal); // Pass the current input value to the parent component
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
        // const updatedFormData = { ...formData };
        // updatedFormData.room.splice(index, 1);
        // setFormData(updatedFormData);
        if (formData.room.length > 1) {
            const updatedFormData = { ...formData };
            updatedFormData.room.splice(index, 1);
            setFormData(updatedFormData);
        }
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

                        <Card>
                            <CardBody>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div
                                        onClick={toggleIsOpen}
                                        style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }}
                                    >
                                        Hotel Details
                                    </div>


                                    {/* <Button
                                        type="button"
                                        color="primary"
                                        className="ms-3"
                                        style={{ minWidth: '50px', marginBottom: '5px' }}
                                        onClick={toggleIsOpen}
                                    >
                                        +
                                    </Button> */}
                                </div>
                                <hr style={{
                                    width: '100%',
                                    margin: 'auto',
                                    borderTop: '1px solid gray',
                                    marginTop: '5px',
                                    marginBottom: '10px'
                                }} />
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
                            </CardBody>
                        </Card>


                        {/* <hr style={{
                            width: '100%',
                            margin: 'auto',
                            borderTop: '1px solid gray',
                            marginTop: '5px',
                            marginBottom: '15px'
                        }} /> */}

                        <Card>
                            <CardBody>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div
                                        onClick={toggleIsOpen}
                                        style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }}
                                    >
                                        Customer Details
                                    </div>


                                    {/* <Button
                                        type="button"
                                        color="primary"
                                        className="ms-3"
                                        style={{ minWidth: '50px', marginBottom: '5px' }}
                                        onClick={toggleIsOpen}
                                    >
                                        +
                                    </Button> */}
                                </div>
                                <hr style={{
                                    width: '100%',
                                    margin: 'auto',
                                    borderTop: '1px solid gray',
                                    marginTop: '5px',
                                    marginBottom: '10px'
                                }} />
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
                            </CardBody>
                        </Card>
                        {/* Here is new */}

                        <Card>
                            <CardBody>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div
                                        onClick={toggleIsOpen}
                                        style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }}
                                    >
                                        Rooms
                                    </div>

                                    <Button
                                        type="button"
                                        color="primary"
                                        className="ms-3"
                                        style={{ minWidth: '50px', marginBottom: '5px' }}
                                        onClick={toggleIsOpen}
                                    >
                                        +
                                    </Button>
                                </div>
                                <hr style={{
                                    width: '100%',
                                    margin: 'auto',
                                    borderTop: '1px solid gray',
                                    marginTop: '5px',
                                    marginBottom: '10px'
                                }} />
                                <Collapse isOpen={isOpen}>
                                    <div style={{ alignItems: 'center' }}>

                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center', marginBottom: '10px' }}>
                                            <div>#</div>
                                            <div>Hotel</div>
                                            <div>Room</div>
                                            <div>Adults</div>
                                            <div>Children</div>
                                            <div>Tax Rate</div>
                                            <div>Amount</div>
                                            <div>Action</div>
                                        </div>
                                        <hr style={{
                                            width: '100%',
                                            margin: 'auto',
                                            borderTop: '1px solid gray',
                                            marginTop: '5px',
                                            marginBottom: '15px'
                                        }} />


                                        {formData.room.map((room, index) => (
                                            <div key={`room-${index}`} style={{ display: 'flex', justifyContent: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <div style={{ marginTop: '10px' }}>{index + 1}</div>

                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                                    <div style={{ width: '100%', }}>

                                                        <SelectInput
                                                            fieldName="hotel"
                                                            onChange={handleFieldChange}
                                                            options={options}
                                                            value={room.hotel}
                                                            errorMessage="Please select hotel"
                                                            placeholder="Select hotel"
                                                        />
                                                    </div>
                                                    <div style={{ width: '100%' }}>


                                                        <SelectInput
                                                            fieldName="room"
                                                            options={options}
                                                            value={room.room}
                                                            errorMessage="Please select room"
                                                            placeholder="Select room"
                                                        />
                                                    </div>
                                                    <div style={{ width: '100%' }}>


                                                        <NumberInput
                                                            fieldName="adults"
                                                            value={room.adults}
                                                            errorMessage="Enter adults"
                                                            onChange={(fieldName, value) => handleNestedFieldChange(fieldName, value, index, 'room')}
                                                            placeholder="Enter adults"
                                                        />
                                                    </div>
                                                    <div style={{ width: '100%' }}>


                                                        <NumberInput
                                                            fieldName="children"
                                                            errorMessage="Enter children"
                                                            onChange={(fieldName, value) => handleNestedFieldChange(fieldName, value, index, 'room')}
                                                            placeholder="Enter adults"
                                                        />
                                                    </div>
                                                    <div style={{ width: '100%' }}>


                                                        <NumberInput
                                                            fieldName="taxrate"
                                                            onChange={(fieldName, value) => handleNestedFieldChange(fieldName, value, index, 'room')}
                                                            errorMessage="Enter tax rate"
                                                            placeholder="Enter tax rate"
                                                        />
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', }}>


                                                        <NumberInput
                                                            fieldName="amount"
                                                            value={room.amount}
                                                            errorMessage="Enter amount"
                                                            placeholder="Enter amount"
                                                        />
                                                    </div>


                                                </div>


                                                <div style={{ display: 'flex', justifyContent: 'center', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                                    <Button color="danger" style={{ display: 'flex', alignItems: 'center' }} onClick={() => handleDeleteRoom(index)}>
                                                        <i className="ri-delete-bin-7-line"></i>
                                                    </Button>
                                                    <Button style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }} color="primary " onClick={handleAddRoom}>
                                                        <i className="ri-add-line"></i>
                                                    </Button>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                </Collapse>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div
                                        onClick={toggleIsOpen}
                                        style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }}
                                    >
                                        Rooms
                                    </div>


                                    <Button
                                        type="button"
                                        color="primary"
                                        className="ms-3"
                                        style={{ minWidth: '50px', marginBottom: '5px' }}
                                        onClick={toggleIsOpen}
                                    >
                                        +
                                    </Button>
                                </div>
                                <hr style={{
                                    width: '100%',
                                    margin: 'auto',
                                    borderTop: '1px solid gray',
                                    marginTop: '5px',
                                    marginBottom: '10px'
                                }} />
                                <Collapse isOpen={isOpen}>
                                    <Table responsive>
                                        <thead style={{ textAlign: 'center' }} >
                                            <tr>
                                                <th>#</th>
                                                <th>Hotel</th>
                                                <th>Room</th>
                                                <th>Adults</th>
                                                <th>Children</th>
                                                <th>Tax Rate</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.room.map((room, index) => (
                                                <tr key={`room-${index}`}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td style={{ width: '20%' }}>
                                                        <SelectInput
                                                            fieldName="hotel"
                                                            options={options}
                                                            value={room.hotel}
                                                            errorMessage="Please select hotel"
                                                            placeholder="Select hotel"

                                                        />
                                                    </td>
                                                    <td style={{ width: '20%' }}>
                                                        <SelectInput
                                                            fieldName="room"
                                                            options={options}
                                                            value={room.room}
                                                            errorMessage="Please select room"
                                                            placeholder="Select room"
                                                        />
                                                    </td>
                                                    <td>
                                                        <NumberInput
                                                            fieldName="adults"
                                                            value={room.adults}
                                                            errorMessage="Enter adults"
                                                            // onChange={(value) => handleInputChange(index, "adults", value)}
                                                            placeholder="Enter adults"
                                                        />
                                                    </td>
                                                    <td>
                                                        <NumberInput
                                                            fieldName="children"
                                                            value={room.children}
                                                            errorMessage="Enter children"
                                                            placeholder="Enter children"
                                                        />
                                                    </td>
                                                    <td>
                                                        <NumberInput
                                                            fieldName="taxrate"
                                                            value={room.taxrate}
                                                            errorMessage="Enter tax rate"
                                                            placeholder="Enter tax rate"
                                                        />
                                                    </td>
                                                    <td>
                                                        <NumberInput
                                                            fieldName="amount"
                                                            value={room.amount}
                                                            errorMessage="Enter amount"
                                                            placeholder="Enter amount"
                                                        />
                                                    </td>
                                                    <td style={{ display: 'flex', justifyContent: 'center', }}>
                                                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                                            <Button color="danger" style={{ display: 'flex', alignItems: 'center', }} onClick={() => handleDeleteRoom(index)}>
                                                                <i class="ri-delete-bin-7-line"></i>
                                                            </Button>
                                                            <Button style={{ marginLeft: '8px', display: 'flex', alignItems: 'center', }} color="primary " onClick={handleAddRoom}>
                                                                <i class="ri-add-line" ></i>
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Collapse>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div
                                        onClick={toggleIsOpen}
                                        style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }}
                                    >
                                        Rooms
                                    </div>


                                    <Button
                                        type="button"
                                        color="primary"
                                        className="ms-3"
                                        style={{ minWidth: '50px', marginBottom: '5px' }}
                                        onClick={toggleIsOpen}
                                    >
                                        +
                                    </Button>
                                </div>
                                <hr style={{
                                    width: '100%',
                                    margin: 'auto',
                                    borderTop: '1px solid gray',
                                    marginTop: '5px',
                                    marginBottom: '10px'
                                }} />
                                <Collapse isOpen={isOpen}>
                                    <Table responsive>
                                        <thead style={{ textAlign: 'center' }} >
                                            <tr>
                                                <th>#</th>
                                                <th>Hotel</th>
                                                <th>Room</th>
                                                <th>Adults</th>
                                                <th>Children</th>
                                                <th>Tax Rate</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.room.map((room, index) => (
                                                <tr key={`room-${index}`}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td style={{ width: '20%' }}>
                                                        <SelectInput
                                                            fieldName="hotel"
                                                            options={options}
                                                            value={room.hotel}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'hotel')}
                                                            errorMessage="Please select hotel"
                                                            placeholder="Select hotel"

                                                        />
                                                    </td>
                                                    <td style={{ width: '20%' }}>
                                                        <SelectInput
                                                            fieldName="room"
                                                            options={options}
                                                            value={room.room}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'room')}
                                                            errorMessage="Please select room"
                                                            placeholder="Select room"
                                                        />
                                                    </td>
                                                    <td>
                                                        <NumberInput
                                                            fieldName="adults"
                                                            onChange={(fieldName, value) => handleNestedFieldChange(fieldName, value, index, 'room')}
                                                            errorMessage="Enter adults"
                                                            placeholder="Enter adults"
                                                        />
                                                    </td>
                                                    <td>
                                                        <NumberInput
                                                            fieldName="children"
                                                            value={room.children}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'children')}
                                                            errorMessage="Enter children"
                                                            placeholder="Enter children"
                                                        />
                                                    </td>
                                                    <td>
                                                        <NumberInput
                                                            fieldName="taxrate"
                                                            value={room.taxrate}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'taxrate')}
                                                            errorMessage="Enter tax rate"
                                                            placeholder="Enter tax rate"
                                                        />
                                                    </td>
                                                    <td>
                                                        <NumberInput
                                                            fieldName="amount"
                                                            value={room.amount}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'amount')}
                                                            errorMessage="Enter amount"
                                                            placeholder="Enter amount"
                                                        />
                                                    </td>
                                                    <td style={{ display: 'flex', justifyContent: 'center', }}>
                                                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                                            <Button color="danger" style={{ display: 'flex', alignItems: 'center', }} onClick={() => handleDeleteRoom(index)}>
                                                                <i class="ri-delete-bin-7-line"></i>
                                                            </Button>
                                                            <Button style={{ marginLeft: '8px', display: 'flex', alignItems: 'center', }} color="primary " onClick={handleAddRoom}>
                                                                <i class="ri-add-line" ></i>
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Collapse>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div
                                        onClick={toggleIsOpen1}
                                        style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }}
                                    >
                                        Activities
                                    </div>


                                    <Button
                                        type="button"
                                        color="primary"
                                        className="ms-3"
                                        style={{ minWidth: '50px', marginBottom: '5px' }}
                                        onClick={toggleIsOpen1}
                                    >
                                        +
                                    </Button>
                                </div>
                                <hr style={{
                                    width: '100%',
                                    margin: 'auto',
                                    borderTop: '1px solid gray',
                                    marginTop: '5px',
                                    marginBottom: '10px'
                                }} />
                                <Collapse isOpen={isOpen1}>
                                    <Table responsive>
                                        <thead style={{ textAlign: 'center' }} >
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Adults</th>
                                                <th>Children</th>
                                                <th>Duration</th>
                                                <th>Date</th>

                                                <th>Tax Rate</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.room.map((room, index) => (
                                                <tr key={`room-${index}`}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td style={{ width: '20%' }}>
                                                        <SelectInput
                                                            fieldName="hotel"
                                                            options={options}
                                                            value={room.hotel}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'hotel')}
                                                            errorMessage="Please select hotel"
                                                            placeholder="Select hotel"

                                                        />
                                                    </td>
                                                    {/* <td style={{ width: '20%' }}>
                                                        <SelectInput
                                                            fieldName="room"
                                                            options={options}
                                                            value={room.room}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'room')}
                                                            errorMessage="Please select room"
                                                            placeholder="Select room"
                                                        />
                                                    </td> */}
                                                    <td>
                                                        <NumberInput
                                                            fieldName="adults"
                                                            value={room.adults}
                                                            onChange={(fieldName, value) => handleNestedFieldChange(fieldName, value, index, 'activities')}
                                                            errorMessage="Enter adults"
                                                            placeholder="Enter adults"
                                                        />
                                                    </td>
                                                    <td>
                                                        <NumberInput
                                                            fieldName="children"
                                                            value={room.children}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'children')}
                                                            errorMessage="Enter children"
                                                            placeholder="Enter children"
                                                        />
                                                    </td>
                                                    <td>
                                                        <NumberInput
                                                            fieldName="duration"
                                                            value={room.adults}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'duration')}
                                                            errorMessage="Enter duration"
                                                            placeholder="Enter duration"
                                                        />
                                                    </td>


                                                    <td>
                                                        <DateInput
                                                            id="date"
                                                            fieldName="date"
                                                            errorMessage="Please select a date"
                                                            placeholder="dd M, yyyy"
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'date')}

                                                        />
                                                    </td>





                                                    <td>
                                                        <NumberInput
                                                            fieldName="taxrate"
                                                            value={room.taxrate}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'taxrate')}
                                                            errorMessage="Enter tax rate"
                                                            placeholder="Enter tax rate"
                                                        />
                                                    </td>
                                                    <td>
                                                        <NumberInput
                                                            fieldName="amount"
                                                            value={room.amount}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'amount')}
                                                            errorMessage="Enter amount"
                                                            placeholder="Enter amount"
                                                        />
                                                    </td>
                                                    <td style={{ display: 'flex', justifyContent: 'center', }}>
                                                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                                            <Button color="danger" style={{ display: 'flex', alignItems: 'center', }} onClick={() => handleDeleteRoom(index)}>
                                                                <i class="ri-delete-bin-7-line"></i>
                                                            </Button>
                                                            <Button style={{ marginLeft: '8px', display: 'flex', alignItems: 'center', }} color="primary " onClick={handleAddRoom}>
                                                                <i class="ri-add-line" ></i>
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Collapse>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div
                                        onClick={toggleIsOpen2}
                                        style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }}
                                    >
                                        Services
                                    </div>


                                    <Button
                                        type="button"
                                        color="primary"
                                        className="ms-3"
                                        style={{ minWidth: '50px', marginBottom: '5px' }}
                                        onClick={toggleIsOpen2}
                                    >
                                        +
                                    </Button>
                                </div>
                                <hr style={{
                                    width: '100%',
                                    margin: 'auto',
                                    borderTop: '1px solid gray',
                                    marginTop: '5px',
                                    marginBottom: '10px'
                                }} />
                                <Collapse isOpen={isOpen2}>
                                    <Table responsive>
                                        <thead style={{ textAlign: 'center' }} >
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Quantity</th>
                                                <th>Tax Rate</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.room.map((room, index) => (
                                                <tr key={`room-${index}`}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td style={{ width: '20%' }}>
                                                        <TextInput
                                                            fieldName="name"
                                                            options={options}
                                                            value={room.hotel}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'name')}
                                                            errorMessage="Please enter name"
                                                            placeholder="Enter name"

                                                        />
                                                    </td>

                                                    <td>
                                                        <NumberInput
                                                            fieldName="quantity"
                                                            value={room.adults}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'quantity')}
                                                            errorMessage="Enter quantity"
                                                            placeholder="Enter quantity"
                                                        />
                                                    </td>

                                                    <td>
                                                        <NumberInput
                                                            fieldName="taxrate"
                                                            value={room.taxrate}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'taxrate')}
                                                            errorMessage="Enter tax rate"
                                                            placeholder="Enter tax rate"
                                                        />
                                                    </td>
                                                    <td>
                                                        <NumberInput
                                                            fieldName="amount"
                                                            value={room.amount}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'amount')}
                                                            errorMessage="Enter amount"
                                                            placeholder="Enter amount"
                                                        />
                                                    </td>
                                                    <td style={{ display: 'flex', justifyContent: 'center', }}>
                                                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                                            <Button color="danger" style={{ display: 'flex', alignItems: 'center', }} onClick={() => handleDeleteRoom(index)}>
                                                                <i class="ri-delete-bin-7-line"></i>
                                                            </Button>
                                                            <Button style={{ marginLeft: '8px', display: 'flex', alignItems: 'center', }} color="primary " onClick={handleAddRoom}>
                                                                <i class="ri-add-line" ></i>
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Collapse>
                            </CardBody>
                        </Card>


                        <Card>
                            <CardBody>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div
                                        onClick={toggleIsOpen3}
                                        style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }}
                                    >
                                        Payments
                                    </div>
                                    <Button
                                        type="button"
                                        color="primary"
                                        className="ms-3"
                                        style={{ minWidth: '50px', marginBottom: '5px' }}
                                        onClick={toggleIsOpen3}
                                    >
                                        +
                                    </Button>

                                </div>
                                <hr style={{
                                    width: '100%',
                                    margin: 'auto',
                                    borderTop: '1px solid gray',
                                    marginTop: '5px',
                                    marginBottom: '10px'
                                }} />
                                <Collapse isOpen={isOpen3}>
                                    <Table responsive>
                                        <thead style={{ textAlign: 'center' }} >
                                            <tr>
                                                <th>#</th>
                                                <th>Payment Method</th>
                                                <th>Date</th>
                                                <th>Transaction Id</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.room.map((room, index) => (
                                                <tr key={`room-${index}`}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td style={{ width: '20%' }}>
                                                        <SelectInput
                                                            fieldName="payment_method"
                                                            options={options}
                                                            value={room.hotel}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'payment_method')}
                                                            errorMessage="Please select payment method"
                                                            placeholder="Select payment method"

                                                        />
                                                    </td>

                                                    <td>
                                                        <DateInput
                                                            id="date"
                                                            fieldName="date"
                                                            errorMessage="Please select a date"
                                                            placeholder="dd M, yyyy"
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'date')}

                                                        />
                                                    </td>
                                                    <td>
                                                        <TextInput
                                                            fieldName="t_id"
                                                            value={room.taxrate}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 't_id')}
                                                            errorMessage="Enter transaction id"
                                                            placeholder="Enter transaction id"
                                                        />
                                                    </td>

                                                    <td>
                                                        <NumberInput
                                                            fieldName="taxrate"
                                                            value={room.taxrate}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'taxrate')}
                                                            errorMessage="Enter tax rate"
                                                            placeholder="Enter tax rate"
                                                        />
                                                    </td>

                                                    <td style={{ display: 'flex', justifyContent: 'center', }}>
                                                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                                            <Button color="danger" style={{ display: 'flex', alignItems: 'center', }} onClick={() => handleDeleteRoom(index)}>
                                                                <i class="ri-delete-bin-7-line"></i>
                                                            </Button>
                                                            <Button style={{ marginLeft: '8px', display: 'flex', alignItems: 'center', }} color="primary " onClick={handleAddRoom}>
                                                                <i class="ri-add-line" ></i>
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Collapse>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div
                                        onClick={toggleIsOpen4}
                                        style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }}
                                    >
                                        Taxes
                                    </div>
                                    <Button
                                        type="button"
                                        color="primary"
                                        className="ms-3"
                                        style={{ minWidth: '50px', marginBottom: '5px' }}
                                        onClick={toggleIsOpen4}
                                    >
                                        +
                                    </Button>


                                </div>
                                <hr style={{
                                    width: '100%',
                                    margin: 'auto',
                                    borderTop: '1px solid gray',
                                    marginTop: '5px',
                                    marginBottom: '10px'
                                }} />
                                <Collapse isOpen={isOpen4}>
                                    <Table responsive>
                                        <thead style={{ textAlign: 'center' }} >
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.room.map((room, index) => (
                                                <tr key={`room-${index}`}>
                                                    <th scope="row">{index + 1}</th>

                                                    <td>
                                                        <TextInput
                                                            fieldName="name"
                                                            value={room.taxrate}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'name')}
                                                            errorMessage="Enter name"
                                                            placeholder="Enter name"
                                                        />
                                                    </td>

                                                    <td>
                                                        <NumberInput
                                                            fieldName="amount"
                                                            value={room.amount}
                                                            onChange={(e) => handleNestedFieldChange(e, index, 'room', 'amount')}
                                                            errorMessage="Enter amount"
                                                            placeholder="Enter amount"
                                                        />
                                                    </td>

                                                    <td style={{ display: 'flex', justifyContent: 'center', }}>
                                                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                                            <Button color="danger" style={{ display: 'flex', alignItems: 'center', }} onClick={() => handleDeleteRoom(index)}>
                                                                <i class="ri-delete-bin-7-line"></i>
                                                            </Button>
                                                            <Button style={{ marginLeft: '8px', display: 'flex', alignItems: 'center', }} color="primary " onClick={handleAddRoom}>
                                                                <i class="ri-add-line" ></i>
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Collapse>
                            </CardBody>
                        </Card>


                        <Button type="submit" color="primary" className="me-1" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Container>
                </CardBody>
            </Card >
        </div >
    )
}

export default CreateBookingForm
