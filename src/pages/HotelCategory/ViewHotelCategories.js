/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useMemo } from "react";
import TableContainer from "../../components/Common/TableContainer";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import ConfirmationModal from "../../components/Common/ConfirmationModal";
import { deleteHotelCategory, deleteHotelCategoryAPI, getHotelCategoryApi } from "../../services/api/hotelCategorysApi";

const ViewHotelCategories = () => {
  const [hotelCategories, sethHotelCategories] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 

  const fetchHotelCategories = async () => {
    try {
      const response = await getHotelCategoryApi();
      const filteredHotelCategories = response.data.hotelCategories.filter(
        (item) => !item.deleted
      );
      sethHotelCategories(filteredHotelCategories);
      return filteredHotelCategories
    } catch (error) {
      console.error("Error fetching hotel categories:", error);
    }
  };

  useEffect(() => {
    fetchHotelCategories();
  }, []);

  const handleDeleteClick = (id) => {
    setShowDeleteModal(true);
    setSelectedFacilities([id]);
  };

  const handleDeleteConfirm = async () => {
    try {
      for (const facilityId of selectedFacilities) {
        await deleteHotelCategoryAPI(facilityId);
      }
      const updatedFacilities = await fetchHotelCategories();
      sethHotelCategories(updatedFacilities);
      setSelectedFacilities([]);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting Hotel Category:", error);
    }
  };

  const columns = useMemo(
    () => [
      // {
      //   Header: () => (
      //     <div>
      //       <input
      //         type="checkbox"
      //         onChange={(e) => {
      //           const isChecked = e.target.checked;
      //           const newSelectedFacilities = isChecked
      //             ? facilities.map((facility) => facility._id)
      //             : [];
      //           setSelectedFacilities(newSelectedFacilities);
      //         }}
      //         checked={
      //           selectedFacilities.length === facilities.length &&
      //           facilities.length !== 0
      //         }
      //       />
      //       {/* <span> Select All</span>  */}
      //     </div>
      //   ),
      //   accessor: "_id",
      //   Cell: ({ row }) => (
      //     <input
      //       type="checkbox"
      //       onChange={() => {
      //         const newSelectedFacilities = [...selectedFacilities];
      //         if (newSelectedFacilities.includes(row.original._id)) {
      //           newSelectedFacilities.splice(
      //             newSelectedFacilities.indexOf(row.original._id),
      //             1
      //           );
      //         } else {
      //           newSelectedFacilities.push(row.original._id);
      //         }
      //         setSelectedFacilities(newSelectedFacilities);
      //       }}
      //       checked={selectedFacilities.includes(row.original._id)}
      //     />
      //   ),
      //   id: "checkbox", // Add a unique ID for the checkbox column
      //   disableFilters: true,
      //   filterable: false,
      //   disableSortBy: true,
      //   show: false,
      // },

      {
        Header: "ID",
        accessor: (originalRow, index) => index + 1, // Display serial number
        disableFilters: true,
        filterable: false,
      },
      // {
      //   Header: "ID",
      //   accessor: "_id",
      //   disableFilters: true,
      //   filterable: false,

      // },
      // {
      //   Header: "Image",
      //   accessor: "image",
      //   disableFilters: true,
      //   filterable: false,
      //   Cell: ({ cell: { value } }) => (
      //     <div style={{ width: "50px", height: "50px" }}>
      //       <img
      //         src={`http://localhost:8086/v1/img/get-Images/image/${value}`}
      //         alt="Img"
      //         style={{ width: "100%", height: "100%", objectFit: "fit" }}
      //       />
      //     </div>
      //   ),
      // },
      {
        Header: "Name",
        accessor: "name",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Action",
        accessor: (cellProps) => (
          <React.Fragment>
            <Link
              to={`/hotelcategories/update?id=${cellProps._id}`}
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
    [selectedFacilities, hotelCategories]
  );

  const breadcrumbItems = [
    { title: "Kingmajesty", link: "/" },
    { title: "Hotel Category", link: "#" },
  ];

  const navigate = useNavigate();
  const handleFacilityClick = () => {
    navigate("/hotelcategories/create");
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Hotel Category" breadcrumbItems={breadcrumbItems} />
          <Card>
            <CardBody>
              <TableContainer
                columns={columns || []}
                data={hotelCategories || []}
                isPagination={false}
                iscustomPageSize={false}
                isBordered={false}
                isGlobalFilter={true}
                isAddFacility={true}
                handleFacilityClick={handleFacilityClick}
                label={"Create New Hotel Category"}
                customPageSize={5}
                className="custom-header-css table align-middle table-nowrap"
                tableClassName="table-centered align-middle table-nowrap mb-0"
                theadClassName="text-muted table-light"
              />

              <ConfirmationModal
                isOpen={showDeleteModal}
                toggle={() => setShowDeleteModal(!showDeleteModal)}
                onConfirm={handleDeleteConfirm}
                message="Are you sure you want to delete the selected hotel catgory?"
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ViewHotelCategories;