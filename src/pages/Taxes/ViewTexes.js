/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useMemo } from "react";
import TableContainer from "../../components/Common/TableContainer";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import ConfirmationModal from "../../components/Common/ConfirmationModal";

import {
    deleteRoomCategory,
    getRoomCategoryApi,
} from "../../services/api/roomCategory/roomCategoryApi";
import { deleteTaxAPI, getTaxesApi } from "../../services/api/taxesApi";

const ViewTexes = () => {
    const [taxes, setTaxes] = useState([]);
    const [selectedId, setSelectedId] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control the delete confirmation modal
    
    const fetchTaxes = async () => {
        try {
            const response = await getTaxesApi()
            console.log(response.taxes);
            
            const filteredData = response.taxes.filter((item) => !item.deleted);
            setTaxes(filteredData);
        } catch (error) {
            console.error("Error fetching facilities:", error);
        }
    };

    useEffect(() => {
        fetchTaxes();
    }, []);


    const handleDeleteClick = (id) => {
        setShowDeleteModal(true);
        setSelectedId([id]);
    };

    const handleDeleteConfirm = async () => {
        try {
            for (const id of selectedId) {
                await deleteTaxAPI(id);
            }
           
            fetchTaxes();
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting facility:", error);
        }
    };

    const columns = useMemo(
        () => [


            {
                Header: "ID",
                accessor: (originalRow, index) => index + 1, // Display serial number
                disableFilters: true,
                filterable: false,
            },

            {
                Header: "Tax",
                accessor: "title",
                disableFilters: true,
                filterable: false,
            },
            {
                Header: "Value(%)",
                accessor: "value",
                disableFilters: true,
                filterable: false,
            },
            {
                Header: "Action",
                accessor: (cellProps) => (
                    <React.Fragment>
                        <Link
                            to={`/taxes/edit?id=${cellProps._id}`}
                            className="me-3 text-primary"
                        >
                            <i className="mdi mdi-pencil font-size-18"></i>
                        </Link>
                        <Link
                            to="#"
                            className="text-danger"
                            onClick={() => handleDeleteClick(cellProps._id)}
                        >
                            <i className="mdi mdi-trash-can font-size-18"></i>
                        </Link>
                    </React.Fragment>
                ),
                disableFilters: true,
                filterable: false,
                disableSortBy: true,
            },
        ],
        [taxes]
    );

    const breadcrumbItems = [
        { title: "KingMajesty", link: "/" },
        { title: "Tax", link: "#" },
    ];

    const navigate = useNavigate();
    const handleFacilityClick = () => {
        navigate("/taxes/create");
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs
                        title="Tax"
                        breadcrumbItems={breadcrumbItems}
                    />
                    <Card>
                        <CardBody>
                            <TableContainer
                                columns={columns || []}
                                data={taxes || []}
                                isPagination={false}
                                iscustomPageSize={false}
                                isBordered={false}
                                isGlobalFilter={true}
                                isAddFacility={true}
                                handleFacilityClick={handleFacilityClick}
                                label={"Create Tax"}
                                customPageSize={5}
                                className="custom-header-css table align-middle table-nowrap"
                                tableClassName="table-centered align-middle table-nowrap mb-0"
                                theadClassName="text-muted table-light"
                            />

                            <ConfirmationModal
                                isOpen={showDeleteModal}
                                toggle={() => setShowDeleteModal(!showDeleteModal)}
                                onConfirm={handleDeleteConfirm}
                                message="Are you sure you want to delete the selected room category?"
                            />
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ViewTexes;
