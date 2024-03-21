// import React from 'react'

// const CreateHotelCategoryForm = () => {
//   return (
//     <div>CreateHotelCategoryForm</div>
//   )
// }

// export default CreateHotelCategoryForm


import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Form,
    Card,
    CardBody,
    Container,
    Button,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { AvForm } from "availity-reactstrap-validation";
import { facilityCreateApi } from "../../services/api/facility/facilityCreateApi";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import SubHeader from "../../components/Common/SubHeader";
import GenralForm from "../../components/Form/GenricForm/GenralForm";
import { PaymentMethodsCreateApi } from "../../services/api/paymentMethods/paymentMethodsApi";
import { HotelCategoryCreateApi } from "../../services/api/hotelCategory/hotelCategorysApi";

const CreateHotelCategoryForm = () => {

    const [formData, setFormData] = useState({
        name: "",
       
    });


    const handleFormChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const formFields = {
        backbutton: "/hotelcategories",
        form: [
            { fieldName: "name", label: "Name", type: "text", errorMessage: "Enter Payment Method", placeholder: "Enter Hotel Category Name" },
        ],
    };

    const handleSubmit = async () => {
        const errors = {};
        formFields.form.forEach(field => {
            if (field.required && !formData[field.fieldName]) {
                errors[field.fieldName] = field.label;
            }
        });
        if (Object.keys(errors).length > 0) {
            const errorMessages = Object.values(errors).join(" ,");
            toastr.error(`Please ensure all required fields are filled. Missing fields: : ${errorMessages}`);
            return;
        }

        try {
            await HotelCategoryCreateApi(formData);
            toastr.success("Hotel Category created successfully");
        } catch (error) {
            console.error(error);
            toastr.error("Failed to create Hotel Category");
        }

    };


    const [breadcrumbItems] = useState([
        { title: "KingMajesty", link: "/" },
        { title: "Create Hotel Category", link: "#" },
    ]);

    return (
        <div className="page-content">
            <Container fluid={true}>
                <Breadcrumbs
                    title="Create Hotel Category"
                    breadcrumbItems={breadcrumbItems}
                />
                <Card>
                    <CardBody>
                        <SubHeader value={'/hotelcategories'} />
                        <GenralForm formFields={formFields} onChange={handleFormChange} />
                        <Button color="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}

export default CreateHotelCategoryForm