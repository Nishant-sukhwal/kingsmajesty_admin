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
import { DealsUpdateApi, getDealsByIdApi } from "../../services/api/deals/dealsApi";

const UpdateDeals = () => {
    const [breadcrumbItems] = useState([
        { title: "KingMajesty", link: "/" },
        { title: "Update Deal", link: "#" },
    ]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id")
    const [formData, setFormData] = useState({ name: ""});
    const [fetchedData, setFetchedData] = useState({ name: "",  });



    const handleFormChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDealsByIdApi(id);
                console.log(data);
                
                setFetchedData(prevData => ({
                    ...prevData,
                    name: data.getDeals?.name,
                }));
                setFormData(prevData => ({
                    ...prevData,
                    name: data.getDeals?.name,
                }));
            } catch (error) {
                console.error("Error fetching Deals:", error);
            }
        };
        fetchData();
    }, [id]);

    // Function to handle form submission
    const handleSubmit = async (e, errors) => {
        e.preventDefault();
        try {
            const res = await DealsUpdateApi(formData, id);
            console.log(res);
            setFormData({
                name: ""
            });
            toastr.success('Deal updated successfully!', 'Success');
        } catch (error) {
            toastr.error('An error occurred. Please try again.', 'Error');
        }
    };

    const formFields = {
        backbutton: "/deals",
        form: [
            { fieldName: "name", label: "Name", type: "text", errorMessage: "Enter deal name", placeholder: "Enter deal name",value: fetchedData?.name },
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
                            <SubHeader value={'/deals'} />
                            <GenralForm formFields={formFields} onChange={handleFormChange} />
                            <Button color="primary" type="submit" onClick={handleSubmit}>Update</Button>
                        </CardBody>
                    </Card>
                </Form>
            </Container>
        </div>
    );
};

export default UpdateDeals;
