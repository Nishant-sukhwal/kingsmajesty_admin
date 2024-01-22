import React from 'react'
import { Button, Col, Row } from 'reactstrap'

import TextInput from '../FormComponent/TextInput'
import SelectInput from '../FormComponent/SelectInput'
import { useNavigate } from 'react-router-dom'

const GenralForm = ({ formFields, onChange }) => {
    console.log(formFields.backbutton);
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(formFields.backbutton)
    }

    const handleFieldChange = (fieldName, value) => {
        onChange(fieldName, value);
    };

    return (
        <div>
            {/* subheader */}
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
            <Row className="mb-3">
                {formFields &&
                    Object.keys(formFields.form).map((key) => {
                        const fieldConfig = formFields.form[key];
                        switch (fieldConfig.type) {
                            case "text":
                                return (
                                    <Col key={fieldConfig.id} lg="6">
                                        <TextInput
                                            label={fieldConfig.label}
                                            fieldName={fieldConfig.fieldName}
                                            errorMessage={fieldConfig.errorMessage}
                                            value={fieldConfig.value}
                                            placeholder={fieldConfig.placeholder}
                                            onChange={handleFieldChange}
                                        />
                                    </Col>
                                );
                            case "select":
                                return (
                                    <Col lg="6">
                                        <SelectInput
                                            label={fieldConfig.label}
                                            fieldName={fieldConfig.fieldName}
                                            options={fieldConfig.options}
                                            onChange={handleFieldChange}
                                        />
                                    </Col>
                                );
                        }
                    })}
            </Row>

        </div>
    )
}

export default GenralForm