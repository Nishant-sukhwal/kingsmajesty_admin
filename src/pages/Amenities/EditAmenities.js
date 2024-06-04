import React, { useEffect, useState } from 'react'
import { Row, Col, Card, CardBody, FormGroup, Button, Label, Input, Container, InputGroup, Form, FormFeedback } from "reactstrap";
import { useDispatch } from 'react-redux'
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "flatpickr/dist/themes/material_green.css";
import SubHeader from '../../components/Common/SubHeader'
import TextInput from '../../components/Form/FormComponent/TextInput';
import { createServiceApi } from '../../services/api/servicesApi';
import ChooseFileInput from '../../components/Form/FormComponent/ChooseFileInput';
import { useLocation } from "react-router-dom";
import { getAmenityByIdApi, updateAmenityApi } from '../../services/api/amenitiesApi';


const EditAmenities = () => {
    const [formData, setFormData] = useState({});
    console.log("formData update ", formData);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");


    useEffect(() => {
        const fetchData = async () => {
            const res = await getAmenityByIdApi(id);
            console.log(res.amenity);
            setFormData(res.amenity);
        }
        fetchData();
    }, [id]);


    const handleFieldChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };


    const handleSubmit = async () => {
        console.log(formData, "formData for api ")
        try {
            
            const res = await updateAmenityApi(id,formData);
            console.log(res);
            toastr.success(res.message);
        } catch (error) {
            toastr.error("Category Saved Successfully!");
        }
    }
    // Conditional image URL variable
    const imageUrl = formData?.media ? `${formData?.media}` : null;

    return (
        <div className="page-content">
            <Card>
                <CardBody>
                    <SubHeader value={"/amenities"} />
                    <Container fluid={true}>

                        <Row>
                            <Col key="name" lg="6">
                                <TextInput
                                    label="Name"
                                    fieldName="name"
                                    errorMessage="Enter name"
                                    placeholder="Enter Name"
                                    onChange={handleFieldChange}
                                    defaultVal={formData.name}
                                />
                            </Col>
                            <Col key="media" lg="6">
                                <ChooseFileInput
                                    label="Media"
                                    fieldName="media"
                                    onChange={handleFieldChange}
                                    errorMessage="Select File"
                                    imageViewer="true"
                                    value={imageUrl}
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

export default EditAmenities
