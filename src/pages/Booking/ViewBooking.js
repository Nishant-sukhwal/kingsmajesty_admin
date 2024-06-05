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
import { deleteBookingApi, getBookingsApi } from "../../services/api/bookingApi";

const ViewBooking = () => {
    const [booking, setBooking] = useState([]);
    const [selectedId, setSelectedId] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control the delete confirmation modal

    const fetchBookings = async () => {
        try {
          const response = await getBookingsApi();
          console.log(response.bookings);
          const filteredData = response.bookings.filter((item) => !item.deleted);
          setBooking(filteredData);
        } catch (error) {
          console.error("Error fetching facilities:", error);
        }
      };
    
    
      useEffect(() => {
        fetchBookings();
      }, []);

    const handleDeleteClick = (id) => {
        setShowDeleteModal(true);
        setSelectedId([id]);
    };

    const handleDeleteConfirm = async () => {
        try {
          for (const id of selectedId) {
            await deleteBookingApi(id);
          }
    
          fetchBookings();
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
                Header: "Room",
                accessor: "room",
                disableFilters: true,
                filterable: false,
                Cell: ({ row }) => {
                    return (
                        <div>
                            {row.original.room.map((room, index) => (
                                <div key={index}>{room.room}</div>
                            ))}
                        </div>
                    );
                }
            },
            {
                Header: "Check In",
                accessor: "checkInDate",
                disableFilters: true,
                filterable: false,
                Cell: ({ value }) => {
                    const date = new Date(value);
                    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                    return formattedDate;
                }
            },
            {
                Header: "Check Out",
                accessor: "checkOutDate",
                disableFilters: true,
                filterable: false,
                Cell: ({ value }) => {
                    const date = new Date(value);
                    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                    return formattedDate;
                }
            },
            {
                Header: "Total (INR)",
                accessor:'total',
                disableFilters: true,
                filterable: false,
            },
            {
                Header: "FirstName",
                accessor:'firstName',
                disableFilters: true,
                filterable: false,
            },
            {
                Header: "LastName",
                accessor:'lastName',
                disableFilters: true,
                filterable: false,
            },
            {
                Header: "Email",
                accessor:'email',
                disableFilters: true,
                filterable: false,
            },
            {
                Header: "Phone",
                accessor:'mobile',
                disableFilters: true,
                filterable: false,
            },
            {
                Header: "status",
                accessor: "status",
                disableFilters: true,
                filterable: false,
            },
            {
                Header: "Action",
                accessor: (cellProps) => (
                    <React.Fragment>
                        <Link
                            to={`/booking/edit?id=${cellProps._id}`}
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
        [booking]
    );

    const breadcrumbItems = [
        { title: "KingMajesty", link: "/" },
        { title: "Booking", link: "#" },
    ];

    const navigate = useNavigate();
    const handleFacilityClick = () => {
        navigate("/booking/create");
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs
                        title="Bookings"
                        breadcrumbItems={breadcrumbItems}
                    />
                    <Card>
                        <CardBody>
                            <TableContainer
                                columns={columns || []}
                                data={booking || []}
                                isPagination={false}
                                iscustomPageSize={false}
                                isBordered={false}
                                isGlobalFilter={true}
                                isAddFacility={true}
                                handleFacilityClick={handleFacilityClick}
                                label={"Create Booking"}
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

export default ViewBooking;
