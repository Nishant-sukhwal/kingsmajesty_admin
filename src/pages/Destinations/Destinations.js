/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useMemo } from "react";
import TableContainer from "../../components/Common/TableContainer";
import { Badge, Button, Card, CardBody, Col, Container, Input, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import ConfirmationModal from "../../components/Common/ConfirmationModal";

import {
  deleteRoomCategory,
  getRoomCategoryApi,
} from "../../services/api/roomCategory/roomCategoryApi";
import { deleteServiceAPI, getServicesApi } from "../../services/api/servicesApi";
import { deleteDestinationApi, getDestinationsApi } from "../../services/api/destinationsApi";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control the delete confirmation modal

  const fetchDestinations = async () => {
    try {
      const response = await getDestinationsApi();
      console.log(response.destinations);
      const filteredData = response.destinations.filter((item) => !item.deleted);
      setDestinations(filteredData);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };


  useEffect(() => {
    fetchDestinations();
  }, []);

  const renderStatusBadge = (status) => {
    switch (status) {
      case "Published":
        return <Badge className="bg-success me-1">Published</Badge>;
      case "NotPublished":
        return <Badge className="bg-danger me-1">Not Published</Badge>;
      default:
        return <Badge className="bg-dark me-1">{status}</Badge>; // Default badge for unknown statuses
    }
  };

  const handleToggleActivate = (destination) => {
    // Update the 'Activate' property of the selected hotel
    const updatedDestination = destinations.map((d) =>
      d._id === destination._id ? { ...d, Activate: !destination.Activate } : d
    );
    setDestinations(updatedDestination);
  };

  const handleDeleteClick = (id) => {
    setShowDeleteModal(true);
    setSelectedId([id]);
  };

  const handleDeleteConfirm = async () => {
    try {
      for (const id of selectedId) {
        await deleteDestinationApi(id);
      }

      fetchDestinations();
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
        Header: "Image",
        accessor: "thumbnail",
        disableFilters: true,
        filterable: false,

        Cell: ({ cell: { value } }) => (

          <div style={{ width: "150px", height: "80px" }}>
            <img
              src={`http://localhost:8086/v1/img/get-Images/image/${value}`}
              alt="Img" style={{ width: "100%", height: "100%", objectFit: "fit" }} />
          </div>

        ),
      },
      {
        Header: "Service",
        accessor: "title",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Status",
        accessor: "release",
        disableFilters: true,
        filterable: false,
        Cell: ({ value }) => renderStatusBadge(value),
      },
      {
        Header: "Active",
        accessor: "Activate",
        Cell: ({ row }) => (
          <div className="form-check form-switch mb-3" dir="ltr">
            <Input
              type="checkbox"
              className="form-check-input"
              id={`customSwitch-${row.original._id}`}
              checked={row.original.Activate}
              onChange={() => handleToggleActivate(row.original)}
            // checked={toggleSwitch}
            // onChange={() => setToggleSwitch((prev) => !prev)}
            // onChange={() => setToggleSwitch(!toggleSwitch)}
            />
          </div>
        ),

        disableFilters: true,
        filterable: false,
        disableSortBy: true,
        show: false,
      },
      {
        Header: "Action",
        accessor: (cellProps) => (
          <React.Fragment>
            <Link
              to={`/destinations/edit?id=${cellProps._id}`}
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
    [destinations]
  );

  const breadcrumbItems = [
    { title: "KingMajesty", link: "/" },
    { title: "Destinations", link: "#" },
  ];

  const navigate = useNavigate();
  const handleFacilityClick = () => {
    navigate("/destinations/create");
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Destinations"
            breadcrumbItems={breadcrumbItems}
          />
          <Card>
            <CardBody>
              <TableContainer
                columns={columns || []}
                data={destinations || []}
                isPagination={false}
                iscustomPageSize={false}
                isBordered={false}
                isGlobalFilter={true}
                isAddFacility={true}
                handleFacilityClick={handleFacilityClick}
                label={"Create Destinations"}
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

export default Destinations;
