

/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useMemo } from "react";
import TableContainer from "../../components/Common/TableContainer";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import ConfirmationModal from "../../components/Common/ConfirmationModal";

const ViewHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control the delete confirmation modal

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(
          "http://localhost:8086/v1/ht/hotels/get-hotels"
        );
        const data = await response.json();
        setHotels(data.hotels);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };

    fetchHotels();
  }, []);



  console.log("hotels List  in viewHotel: ", hotels);

  const columns = useMemo(
    () => [
      {
        Header: () => (
          <div>
          <input
            type="checkbox"
            onChange={(e) => {
              const isChecked = e.target.checked;
            //   const newSelectedFacilities = isChecked
            //     ? facilities.map((hotels) => hotels._id)
            //     : [];
            //   setSelectedFacilities(newSelectedFacilities);
            // }}
            // checked={
            //   selectedFacilities.length === hotels.length &&
            //   hotels.length !== 0
            }}
          />
           {/* <span> Select All</span>  */}
          </div>
        ),
        accessor: "_id",
        Cell: ({ row }) => (
          <input
            type="checkbox"
            onChange={() => {
              const newSelectedFacilities = [...selectedFacilities];
              if (newSelectedFacilities.includes(row.original._id)) {
                newSelectedFacilities.splice(
                  newSelectedFacilities.indexOf(row.original._id),
                  1
                );
              } else {
                newSelectedFacilities.push(row.original._id);
              }
              setSelectedFacilities(newSelectedFacilities);
            }}
            checked={selectedFacilities.includes(row.original._id)}
          />
        ),
        id: "checkbox", // Add a unique ID for the checkbox column
        disableFilters: true,
        filterable: false,
        disableSortBy: true,
        show: false,
      },

      // ID
      {
        Header: "ID",
        accessor: (originalRow, index) => index + 1, // Display serial number
        disableFilters: true,
        filterable: false,
      }, 
      // Image
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
      // Name
      {
        Header: "Name",
        accessor: "name",
        disableFilters: true,
        filterable: false,
      },
      // Category
      {
        Header: "Category",
        accessor: "hotelCategory",
        disableFilters: true,
        filterable: false,
      },
      // Address
      {
        Header: "Address",
        accessor: "address",
        disableFilters: true,
        filterable: false,
        Cell: ({ value }) => (
          <span title={value ? value : 'default'}>
            {value && value.length > 40 ? `${value.substring(0, 30)}...` : value}
          </span>
          // <span title={value}>{value.length > 40 ? `${value.substring(0, 30)}...` : value}</span>
        ),
      },
      // Class
      {
        Header: "Class",
        accessor: "classStatus",
        disableFilters: true,
        filterable: false,

      },
      // Status
      {
        Header: "Status",
        accessor: "releaseStatus",
        disableFilters: true,
        filterable: false,

      },
      // Action
      {
        Header: "Action",
        accessor: (cellProps) => (
          <React.Fragment>
            <Link
               to={`/hotel/update?id=${cellProps._id}`}
              className="me-3 text-primary"
            >
              <i className="mdi mdi-pencil font-size-18"></i>
            </Link>
            <Link
              to="#"
              className="text-danger"
              onClick={() => handleDeleteClick(cellProps.original)}
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
    [hotels]
  );

  const breadcrumbItems = [
    { title: "Hotels", link: "/" },
    { title: "ViewHotels List", link: "#" },
  ];

  const navigate = useNavigate();
  const handleFacilityClick = () => {
    navigate("/Hotels/create");
  };

  const handleDeleteClick = () => {
    // Show the delete confirmation modal when the delete link is clicked
    setShowDeleteModal(true);
  };
  const handleDeleteConfirm = () => {
    // Handle the delete confirmation
    // Perform your delete logic here
    console.log("Deleting selected facilities:", selectedFacilities);

    // Close the confirmation modal
    setShowDeleteModal(false);
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Hotels" breadcrumbItems={breadcrumbItems} />
          <Card>
            <CardBody>

              <TableContainer
                columns={columns || []}
                data={hotels || []}
                isGlobalFilter={true}
                isAddFacility={true}
                handleFacilityClick={handleFacilityClick}
                label={"Create New Hotels"}
                customPageSize={5}
                className="custom-header-css table align-middle table-nowrap"
                tableClassName="table-centered align-middle table-nowrap mb-0"
                theadClassName="text-muted table-light"
              />

              <ConfirmationModal
                isOpen={showDeleteModal}
                toggle={() => setShowDeleteModal(!showDeleteModal)}
                onConfirm={handleDeleteConfirm}
                message="Are you sure you want to delete the selected facilities?"
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ViewHotels;
