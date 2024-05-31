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
import { deleteServiceAPI, getServicesApi } from "../../services/api/servicesApi";

const Destinations = () => {
  const [services, setServices] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control the delete confirmation modal

  const fetchServices = async () => {
    try {
      const response = await getServicesApi();
      console.log(response.services);
      const filteredData = response.services.filter((item) => !item.deleted);
      setServices(filteredData);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };


  useEffect(() => {
    fetchServices();
  }, []);



  const handleDeleteClick = (id) => {
    setShowDeleteModal(true);
    setSelectedId([id]);
  };

  const handleDeleteConfirm = async () => {
    try {
      for (const id of selectedId) {
        await deleteServiceAPI(id);
      }

      fetchServices();
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
        Header: "Service",
        accessor: "title",
        disableFilters: true,
        filterable: false,
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
    [services]
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
                data={services || []}
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
