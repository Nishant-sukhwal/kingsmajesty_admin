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
import { deleteTeamMembersAPI, getRoleApi, getTeamMembersAPI } from "../../services/api/teamMemberApi";

const ViewTeam = () => {
  const [category, setCategory] = useState([]);
  const [team, setTeam] = useState([]);
  console.log("team teamteam is---", team);
  const [selectedId, setSelectedId] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 

  const fetchTeamMembers = async () => {
    try {
      const res = await getTeamMembersAPI()
      console.log(res);
      const filteredData = res.data.teamMembers.filter((item) => !item.deleted);
      setTeam(filteredData);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  // const [roles, setRoles] = useState([]);

  // console.log("role names",roles)



  // const fetchRole = async () => {
  //   const res = await getRoleApi();
  //   const transformedRoles = res.roles.map(role => ({
  //     value: role._id,
  //     label: role.role_name
  //   }));
  //   setRoles(transformedRoles);
  // };

  useEffect(() => {
    fetchTeamMembers();
   
  }, []);

  //This is for delete
  const fetchRoomCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:8086/v1/rm/roomcategory/get-roomcategory"
      );
      const data = await response.json();
      const filteredData = data.category.filter((item) => !item.deleted);
      return filteredData;
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setShowDeleteModal(true);
    setSelectedId([id]);
  };

  const handleDeleteConfirm = async () => {
    try {
      for (const id of selectedId) {
        await deleteTeamMembersAPI(id);
      }
      fetchTeamMembers()
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting facility:", error);
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
        accessor: "firstname",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Role",
        accessor: "roles",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Action",
        accessor: (cellProps) => (
          <React.Fragment>
            <Link
              to={`/team/update?id=${cellProps._id}`}
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
    [team]
  );

  const breadcrumbItems = [
    { title: "KingMajesty", link: "/" },
    { title: "Team", link: "#" },
  ];

  const navigate = useNavigate();
  const handleFacilityClick = () => {
    navigate("/team/create");
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Team/Staff"
            breadcrumbItems={breadcrumbItems}
          />
          <Card>
            <CardBody>
              <TableContainer
                columns={columns || []}
                data={team || []}
                isPagination={false}
                iscustomPageSize={false}
                isBordered={false}
                isGlobalFilter={true}
                isAddFacility={true}
                handleFacilityClick={handleFacilityClick}
                label={"Create Member"}
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

export default ViewTeam;
