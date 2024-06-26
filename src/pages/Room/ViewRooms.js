

/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useMemo } from "react";
import TableContainer from "../../components/Common/TableContainer";
import { Button, Card, CardBody, Col, Container, Input, Row ,Badge} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import ConfirmationModal from "../../components/Common/ConfirmationModal";
import getRoomsApi, { deleteRoomApi } from "../../services/api/room/roomsApi";

const ViewRooms = () => {
  const [facilities, setFacilities] = useState([]);

  const [selectedFacilities, setSelectedFacilities] = useState([]);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control the delete confirmation modal
 
  const [rooms, setRooms] = useState([]);
  const [roomActive, setRoomActive] = useState([]);


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await getRoomsApi();
        const filteredRooms = response.rooms.filter(
          (item) => !item.deleted
        );
        setRooms(filteredRooms);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };
    fetchRooms();
  }, []);
  

  // useEffect(() => {
  //   const fetchRooms = async () => {
  //     try {
  //       // Fetch data from your API endpoint
  //       const response = await fetch("http://localhost:8086/v1/rm/rooms/room-list");
  //       const data = await response.json();
  //       const filteredRooms = data.rooms.filter(
  //         (item) => !item.deleted
  //       );
  //       setRooms(filteredRooms);
  //     } catch (error) {
  //       console.error("Error fetching rooms:", error);
  //     }
  //   };

  //   fetchRooms();
  // }, []);

     //This is for delete
     const fetchRooms = async () => {
      try {
        // const response = await fetch(
        //   "http://localhost:8086/v1/rm/rooms/room-list"
        // );
        const response = await getRoomsApi();
        // const data = await response.json();
        
        const filteredRooms = response.rooms.filter(
          (item) => !item.deleted
        );
        return filteredRooms;
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

  const handleDeleteClick = (id) => {
    setShowDeleteModal(true);
    setSelectedFacilities([id]);
  };

  const handleDeleteConfirm = async () => {
    try {
      for (const Id of selectedFacilities) {
        await deleteRoomApi(Id);
      }

      const updatedRoom = await fetchRooms();
      
      setRooms(updatedRoom);
      setSelectedFacilities([]);


      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting Room:", error);
    }
  };

  const handleToggleActivate = (room) => {
    // Update the 'Activate' property of the selected hotel
    const updatedRoms = rooms.map((r) =>
      r._id === room._id ? { ...r, Activate: !room.Activate } : r
    );
    setRoomActive(updatedRoms);
  };

  
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

  const columns = useMemo(
    () => [
      {
        
        Header: () => (
          <div>
             
          <input
            type="checkbox"
            onChange={(e) => {
              const isChecked = e.target.checked;
              const newSelectedFacilities = isChecked
                ? facilities.map((facility) => facility._id)
                : [];
              setSelectedFacilities(newSelectedFacilities);
            }}
            checked={
              selectedFacilities.length === facilities.length &&
              facilities.length !== 0
            }
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
      {
        Header: "Image",
        accessor: "thumbnail",
        disableFilters: true,
        filterable: false,
        Cell: ({ cell: { value } }) => (
          
          <div style={{ width: "150px", height: "80px" }}>
          <img 
                      src={`http://localhost:8086/v1/img/get-Images/image/${value}`}
                      style={{ width: "100%", height: "100%", objectFit: "fit" }}
                       alt="img" />
            {/* <img src={value} alt="Img" style={{ width: "100%", height: "100%", objectFit: "fit" }} /> */}
          </div>
        ),
      },
      {
        Header: "Name",
        accessor: "category",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Room Stocks",
        accessor: "rooms_stock",
        disableFilters: true,
        filterable: false,
      },

      {
        Header: "Status",
        accessor: "releaseStatus",
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
          console.log(cellProps._id),
          <React.Fragment>
           <Link
              to={`/room/update?id=${cellProps._id}`}
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
    [selectedFacilities, facilities]
  );

  const breadcrumbItems = [
    { title: "Rooms", link: "/" },
    { title: "ViewRooms List", link: "#" },
  ];

  const navigate = useNavigate();
  const handleFacilityClick = () => {
    navigate("/room/create");
  };

 

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Rooms" breadcrumbItems={breadcrumbItems} />
          <Card>
            <CardBody>
      
              <TableContainer
                columns={columns || []}
                data={rooms || []}
                isPagination={false}
                iscustomPageSize={false}
                isBordered={false}
                isGlobalFilter={true}
                isAddFacility={true}
                handleFacilityClick={handleFacilityClick}
                label={"Create New Rooms"}
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

export default ViewRooms;

