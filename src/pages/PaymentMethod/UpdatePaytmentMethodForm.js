import React, { useEffect, useState } from "react";
import {
    Form,
    Card,
    CardBody,
    Container,
    Button,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { useLocation, useNavigate } from "react-router-dom";
import SubHeader from "../../components/Common/SubHeader";
import GenralForm from "../../components/Form/GenricForm/GenralForm";
import {  getPaymentMethodsByIdApi, paymentMethodsUpdateApi } from "../../services/api/paymentMethods/paymentMethodsApi";

const UpdatePaymentMethods = () => {
    const [breadcrumbItems] = useState([
        { title: "KingMajesty", link: "/" },
        { title: "Update Hotel Category", link: "#" },
    ]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id")
    const [formData, setFormData] = useState({ name: ""});
    const [fetchedData, setFetchedData] = useState({ name: "",  });
    console.log("formData formData formData", formData);
    console.log("formData formData formData", fetchedData);


    const handleFormChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPaymentMethodsByIdApi(id);
                
                setFetchedData(prevData => ({
                    ...prevData,
                    name: data.paymentMethods?.name,
                }));
                setFormData(prevData => ({
                    ...prevData,
                    name: data.paymentMethods?.name,
                }));
            } catch (error) {
                console.error("Error fetching Payment method data:", error);
            }
        };
        fetchData();
    }, [id]);

    // Function to handle form submission
    const handleSubmit = async (e, errors) => {
        e.preventDefault();
        try {
            const res = await paymentMethodsUpdateApi(formData, id);
            console.log(res);
            setFormData({
                media: "" || null,
                name: ""
            });
            toastr.success('Payment Method  updated successfully!', 'Success');
        } catch (error) {
            toastr.error('An error occurred. Please try again.', 'Error');
        }
    };

    const formFields = {
        backbutton: "/paymentmethods",
        form: [
            { fieldName: "name", label: "Name", type: "text", errorMessage: "Enter Payment Method", placeholder: "Enter Payment Method Name",defaultValue: fetchedData?.name },
        ],
    };

    return (
        <div className="page-content">
            <Container fluid={true}>
                <Breadcrumbs
                    title="Update Payment Method"
                    breadcrumbItems={breadcrumbItems}
                />
                <Form>
                    <Card>
                        <CardBody>
                            <SubHeader value={'/paymentmethods'} />
                            <GenralForm formFields={formFields} onChange={handleFormChange} />
                            <Button color="primary" type="submit" onClick={handleSubmit}>Update</Button>
                        </CardBody>
                    </Card>
                </Form>
            </Container>
        </div>
    );
};

export default UpdatePaymentMethods;
