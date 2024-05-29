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
import { createTaxApi, getTaxByIdApi, taxUpdateApi } from '../../services/api/taxesApi';
import { useLocation, useNavigate } from "react-router-dom";

// import CkEditor from "../FormComponent/CkEditor";

const EditTaxForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    console.log("formData update ", formData);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");




    const handleFieldChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const fetchData = async () => {
        const res = await getTaxByIdApi(id);
        console.log(res);
        setFormData(res.data.taxById);
    }

    useEffect(() => {
        fetchData();
    }, [id]);



    const releaseOptions = ["Published", "NotPublished", "Awaiting", "Archived"];

    const handleSubmit = async () => {
        console.log(formData, "formData for api ")
        try {
            const res = await taxUpdateApi(formData, id);
            toastr.success(res.message);
        } catch (error) {
            toastr.error(error.message);
        }

    }

    return (
        <div className="page-content">
            <Card>
                <CardBody>
                    <SubHeader value={"/taxes"} />
                    <Container fluid={true}>
                        <Row>
                            <Col key="title" lg="6">
                                <TextInput
                                    label="Title"
                                    fieldName="title"
                                    errorMessage="Enter name"
                                    value={formData?.title}
                                    placeholder="Enter Name"
                                    onChange={handleFieldChange}
                                    defaultVal={formData?.title}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col key="value" lg="6">
                                <NumberInput
                                    label="Value"
                                    fieldName="value"
                                    errorMessage="Enter value"
                                    value={formData?.value}
                                    placeholder="Enter value"
                                    onChange={handleFieldChange}
                                    defaultVal={formData?.value}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col key="release" lg="6">
                                <RadioButton
                                    label="Release"
                                    fieldName="release"
                                    errorMessage="Select option"
                                    value={formData?.release}
                                    placeholder="Please Select option"
                                    onChange={handleFieldChange}
                                    options={releaseOptions}
                                    defaultVal={formData?.release}
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

export default EditTaxForm



