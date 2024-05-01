import React, { useEffect, useState } from 'react'
import GenralForm from '../../components/Form/GenricForm/GenralForm'
// import { TabContent, TabPane, Collapse, NavLink, NavItem, Nav, Card, Row, Col, CardBody, CardHeader, Container } from "reactstrap";
import { Button, Card, CardBody, Container, Collapse, TabContent, TabPane, NavLink, Row, Col, Table } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { saveRoomCategoryReq } from '../../store/roomCategory/actions'
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import SubHeader from '../../components/Common/SubHeader'
import { Link } from "react-router-dom";

const CreateRoleForm = () => {
  // const [hotels, setHotels] = useState([]);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [sq1, setSq1] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const dummyMenuItems = [
    { id: 1, name: 'Dashboard', enabled: true },
    { id: 2, name: 'Orders', enabled: true },
    { id: 3, name: 'Customers', enabled: false },
    { id: 4, name: 'Inventory', enabled: true },
    { id: 5, name: 'Reports', enabled: false },

  ];

  const handleToggleSq1 = () => {
    setSq1(!sq1);
  };

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  const toggleCollapse1 = () => {
    setIsOpen1(!isOpen1);
  };



  const [formData, setFormData] = useState({
    name: '',
  });
  console.log(formData);

  const [hotelsEnabled, setHotelsEnabled] = useState(false);
  const [roomsEnabled, setRoomsEnabled] = useState(false);
  const [roomCategoryEnabled, setRoomCategoryEnabled] = useState(false);
  const [hotelCategoryEnabled, setHotelCategoryEnabled] = useState(false);
  const [activityEnabled, setActivityEnabled] = useState(false);
  const [serviceEnabled, setServiceEnabled] = useState(false);
  const [dealsEnabled, setDealsEnabled] = useState(false);
  const [paymentOptionEnabled, setPaymentOptionEnabled] = useState(false);
  const [dashboardEnabled, setDashboardEnabled] = useState(false);
  const [roleEnabled, setRoleEnabled] = useState(false);
  const [teamEnabled, setTeamEnabled] = useState(false);
  const [settingsEnabled, setSettingsEnabled] = useState(false);

  const handleToggle = (setter) => {
    setter((prev) => !prev);
  };


  // useEffect(() => {
  //   const fetchHotels = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:8086/v1/ht/hotels/get-hotels"
  //       );
  //       const data = await response.json();
  //       setHotels(data.hotels);
  //     } catch (error) {
  //       console.error("Error fetching facilities:", error);
  //     }
  //   };

  //   fetchHotels();
  // }, []);
  // console.log(hotels);


  // Dynamically generate options based on the hotels data
  // const options = hotels.map(hotel => ({
  //   value: hotel.name,
  //   label: hotel.name,
  // }));


  const handleFormChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const formFields = {
    backbutton: '/role',
    form: [
      // {
      //   fieldName: 'hotel',
      //   label: 'Hotel',
      //   type: 'select',
      //   errorMessage: 'Please Select Hotel',
      //   value: formData.hotel,
      //   options: options,
      // },
      {
        fieldName: 'name',
        label: 'Role',
        type: 'text',
        errorMessage: 'Enter Role Name',
        value: '',
        placeholder: 'Enter Role Name'
      },
      {
        fieldName: 'description',
        label: 'Description',
        type: 'text',
        errorMessage: 'Enter Description',
        value: '',
        placeholder: 'Enter Description'
      }
    ]
  }
  const [menuItemEnabled, setMenuItemEnabled] = useState({});
  const handleSubmit = () => {
    dispatch(saveRoomCategoryReq(formData));
    toastr.success("Category Saved Successfully!");
  }

  // const handleToggleMenuItem = (id) => {
  //   const updatedMenuItems = menuItems.map((item) =>
  //     item.id === id ? { ...item, enabled: !item.enabled } : item
  //   );
  //   setMenuItems(updatedMenuItems);
  //   // Add API call here to update menuItem.enabled on the backend
  // };

  const handleToggleMenuItem = (id) => {
    setMenuItemEnabled((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };



  // State variables for permission toggles
  const [permissions, setPermissions] = useState({
    hotels: false,
    rooms: false,
    roomCategory: false,
    hotelCategory: false,
    activity: false,
    service: false,
    deals: false,
    paymentOption: false,
    dashboard: false,
    role: false,
    team: false,
    settings: false
  });

  // Function to toggle permissions
  const handleToggles = (moduleName, action) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [moduleName]: {
        ...prevPermissions[moduleName],
        [action]: !prevPermissions[moduleName][action]
      }
    }));
  };


  // Simulated API response with module data
  const modules = [
    { name: 'Hotels', key: 'hotels' },
    { name: 'Rooms', key: 'rooms' },
    { name: 'Room Category', key: 'roomCategory' },
    { name: 'Hotel Category', key: 'hotelCategory' },
    { name: 'Payment Option', key: 'payment' },
    { name: 'Activity', key: 'activity' },
    { name: 'Services', key: 'service' },
    { name: 'Booking', key: 'book' },
    { name: 'Deals', key: 'deals' },
    { name: 'Roles', key: 'roles' },
    { name: 'Team', key: 'team' },
    // Add more modules here based on API response
  ];


  return (
    <div className="page-content">
      <Container fluid={true}>
        <Card>
          <CardBody>
            <SubHeader value={"/role"} />
            <GenralForm formFields={formFields} onChange={handleFormChange} />

            {/* <Col xl={12}>
              <Card>
                <CardBody>
                  <h4
                    className="card-title"
                    onClick={toggleCollapse}
                    style={{ cursor: "pointer" }}
                  >Sidebar Menu <span style={{ cursor: "pointer", fontSize: 'x-large', marginLeft: '15px', fontWeight: 'bold' }}>+</span></h4>
                  <p className="card-title-desc">Select sidebar menu for role</p>


                  <Collapse isOpen={isOpen}>

                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Menu Item</th>
                          <th>Activate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummyMenuItems.map((menuItem, index) => (
                          <tr key={index}>
                            <td>{menuItem.name}</td>
                            <td>
                              <input
                                type="checkbox"
                                id={`square-switch${menuItem.id}`}
                                switch="none"
                                checked={menuItemEnabled[menuItem.id]}
                                onChange={() => handleToggleMenuItem(menuItem.id)}
                              />
                              <label htmlFor={`square-switch${menuItem.id}`} data-on-label="Yes" data-off-label="No" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Collapse>
                </CardBody>
              </Card>
            </Col> */}


            <Col xl={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title" onClick={toggleCollapse1} style={{ cursor: "pointer" }}>
                    Sidebar & Permission Menu<span style={{ cursor: "pointer", fontSize: 'x-large', marginLeft: '15px', fontWeight: 'bold' }}>+</span>
                  </h4>
                  <p className="card-title-desc">Select Permission for role</p>

                  <Collapse isOpen={isOpen1}>
                    <div className="card card-body mb-0">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Module</th>
                            <th>Active</th>
                            <th>View</th>
                            <th>Create</th>
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modules.map((module) => (
                            <tr>
                              <td>{module.name}</td>
                              <td>
                                <input
                                  type="checkbox"
                                  id={`square-switch${module.key}`}
                                  switch="none"
                                  checked={menuItemEnabled[module.key]}
                                  onChange={() => handleToggleMenuItem(module.key)}
                                />
                                <label htmlFor={`square-switch${module.key}`} data-on-label="Yes" data-off-label="No" />
                              </td>
                              <td>
                                <input
                                  type="checkbox"
                                  checked={permissions[module.key]?.view}
                                  onChange={() => handleToggles(module.key, 'view')}
                                />
                              </td>
                              <td>
                                <input
                                  type="checkbox"
                                  checked={permissions[module.key]?.create}
                                  onChange={() => handleToggles(module.key, 'create')}
                                />
                              </td>
                              <td>
                                <input
                                  type="checkbox"
                                  checked={permissions[module.key]?.edit}
                                  onChange={() => handleToggles(module.key, 'edit')}
                                />
                              </td>
                              <td>
                                <input
                                  type="checkbox"
                                  checked={permissions[module.key]?.delete}
                                  onChange={() => handleToggles(module.key, 'delete')}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Collapse>
                </CardBody>
              </Card>
            </Col>

            <Button color="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

export default CreateRoleForm;