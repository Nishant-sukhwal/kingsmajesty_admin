import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row } from "reactstrap";

const SubHeader = (value) => {
    const navigate = useNavigate();
   
    const handleNavigate = () => {
        navigate(value.value);
    }
    return (
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
    );
};

export default SubHeader;

