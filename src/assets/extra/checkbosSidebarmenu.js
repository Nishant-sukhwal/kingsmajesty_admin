import React, { useEffect, useState } from 'react'
import GenralForm from '../../components/Form/GenricForm/GenralForm'
// import { TabContent, TabPane, Collapse, NavLink, NavItem, Nav, Card, Row, Col, CardBody, CardHeader, Container } from "reactstrap";
import { Button, Card, CardBody, Container, Collapse, TabContent, TabPane, NavLink, Row, Col } from 'reactstrap'
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
  const [sq1, setSq1] = useState(false);


  const handleToggleSq1 = () => {
    setSq1(!sq1);
  };

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
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

  // Function to toggle the state for each menu item
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

  const handleSubmit = () => {
    dispatch(saveRoomCategoryReq(formData));
    toastr.success("Category Saved Successfully!");
  }

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Card>
          <CardBody>
            <SubHeader value={"/role"} />
            <GenralForm formFields={formFields} onChange={handleFormChange} />

            <Col xl={12}>
              <Card>
                <CardBody>
                  <h4
                    className="card-title"
                    onClick={toggleCollapse}
                    style={{ cursor: "pointer" }}
                  >Sidebar Menu <span style={{ cursor: "pointer", fontSize: 'x-large', marginLeft: '15px', fontWeight: 'bold' }}>+</span></h4>
                  <p className="card-title-desc">Select sidebar menu for role</p>

                  {/* <p>
                    <Link
                      to="#"
                      onClick={toggleCollapse}
                      style={{ cursor: "pointer" }}
                      className="btn btn-primary mo-mb-2"
                    >
                      Link with href
                    </Link>{" "}
                    &nbsp;
                    <button
                      onClick={toggleCollapse}
                      className="btn btn-primary mo-mb-2"
                      type="button"
                      style={{ cursor: "pointer" }}
                    >
                      Button with data-bs-target
                    </button>
                  </p> */}
                  <Collapse isOpen={isOpen}>
                    <div className="card card-body mb-0">
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim
                      keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                      {/* 
                      <Col lg="6">
                        <div className="mt-4 mt-lg-0">
                          <h5 className="font-size-14 mb-3">Square switch</h5>
                          <div className="d-flex">
                            <div className="square-switch">
                              <input
                                type="checkbox"
                                id="square-switch1"
                                switch="none"
                                checked={sq1}
                                onChange={handleToggleSq1}
                              />
                              <label htmlFor="square-switch1" data-on-label="On" data-off-label="Off" />
                            </div>
                           
                          </div>
                        </div>
                      </Col> */}

                      <Col lg="6">
                        <div className="mt-4 mt-lg-0">
                          <h5 className="font-size-14 mb-3">Sidebar Menu</h5>
                          <div>
                            {/* Hotels */}
                            <div className="square-switch">
                              <input
                                type="checkbox"
                                id="hotels-switch"
                                checked={hotelsEnabled}
                                onChange={() => handleToggle(setHotelsEnabled)}
                              />
                              <label htmlFor="hotels-switch">Hotels</label>
                            </div>

                            {/* Rooms */}
                            <div className="square-switch">
                              <input
                                type="checkbox"
                                id="rooms-switch"
                                checked={roomsEnabled}
                                onChange={() => handleToggle(setRoomsEnabled)}
                              />
                              <label htmlFor="rooms-switch">Rooms</label>
                            </div>

                            {/* Room Category */}
                            <div className="square-switch">
                              <input
                                type="checkbox"
                                id="room-category-switch"
                                checked={roomCategoryEnabled}
                                onChange={() => handleToggle(setRoomCategoryEnabled)}
                              />
                              <label htmlFor="room-category-switch">Room Category</label>
                            </div>

                            {/* Hotel Category */}
                            <div className="square-switch">
                              <input
                                type="checkbox"
                                id="hotel-category-switch"
                                checked={hotelCategoryEnabled}
                                onChange={() => handleToggle(setHotelCategoryEnabled)}
                              />
                              <label htmlFor="hotel-category-switch">Hotel Category</label>
                            </div>

                            {/* Activity */}
                            <div className="square-switch">
                              <input
                                type="checkbox"
                                id="activity-switch"
                                checked={activityEnabled}
                                onChange={() => handleToggle(setActivityEnabled)}
                              />
                              <label htmlFor="activity-switch">Activity</label>
                            </div>

                            {/* Service */}
                            <div className="square-switch">
                              <input
                                type="checkbox"
                                id="service-switch"
                                checked={serviceEnabled}
                                onChange={() => handleToggle(setServiceEnabled)}
                              />
                              <label htmlFor="service-switch">Service</label>
                            </div>

                            {/* Deals */}
                            <div className="square-switch">
                              <input
                                type="checkbox"
                                id="deals-switch"
                                checked={dealsEnabled}
                                onChange={() => handleToggle(setDealsEnabled)}
                              />
                              <label htmlFor="deals-switch">Deals</label>
                            </div>

                            {/* Payment Option */}
                            <div className="square-switch">
                              <input
                                type="checkbox"
                                id="payment-option-switch"
                                checked={paymentOptionEnabled}
                                onChange={() => handleToggle(setPaymentOptionEnabled)}
                              />
                              <label htmlFor="payment-option-switch">Payment Option</label>
                            </div>

                            {/* Dashboard */}
                            <div className="square-switch">
                              <input
                                type="checkbox"
                                id="dashboard-switch"
                                checked={dashboardEnabled}
                                onChange={() => handleToggle(setDashboardEnabled)}
                              />
                              <label htmlFor="dashboard-switch">Dashboard</label>
                            </div>

                            {/* Role */}
                            <div className="square-switch">
                              <input
                                type="checkbox"
                                id="role-switch"
                                checked={roleEnabled}
                                onChange={() => handleToggle(setRoleEnabled)}
                              />
                              <label htmlFor="role-switch">Role</label>
                            </div>

                            {/* Team */}
                            <div className="square-switch">
                              <input
                                type="checkbox"
                                id="team-switch"
                                checked={teamEnabled}
                                onChange={() => handleToggle(setTeamEnabled)}
                              />
                              <label htmlFor="team-switch">Team</label>
                            </div>

                            {/* Settings */}
                            <div className="square-switch">
                              <input
                                type="checkbox"
                                id="settings-switch"
                                checked={settingsEnabled}
                                onChange={() => handleToggle(setSettingsEnabled)}
                              />
                              <label htmlFor="settings-switch">Settings</label>
                            </div>
                          </div>
                        </div>
                      </Col>



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


{/* <Col xl={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title" onClick={toggleCollapse1} style={{ cursor: "pointer" }}>
                   Permission Menu<span style={{ cursor: "pointer", fontSize: 'x-large', marginLeft: '15px', fontWeight: 'bold' }}>+</span>
                  </h4>
                  <p className="card-title-desc">Select Permission for role</p>
                  <Collapse isOpen={isOpen1}>
                    <div className="card card-body mb-0">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Module</th>
                           
                            <th>View</th>
                            <th>Create</th>
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {permission.map((permission) => (
                            <tr key={permission._id}>
                               <td>{permission.module_name}</td>
                              
                              <td>
                                <input
                                  type="checkbox"
                                  id={`square-switch${module._id}`}
                                  switch="none"
                                  checked={selectedModuleIds.includes(module._id)}
                                  onChange={() => handleToggleMenuItem(module._id)}
                                />
                                <label htmlFor={`square-switch${module._id}`} data-on-label="Yes" data-off-label="No" />
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
            </Col>  */}







//code

 {/* <div className="card card-body mb-0">
                      <Col lg="6">
                        <div className="mt-4 mt-lg-10 d-flex align-items-center gap-4" >
                          <h5 className="font-size-14 mb-3">Hotel</h5>
                          <div className="d-flex">
                            <div className="square-switch">
                              <input
                                type="checkbox"
                                id="square-switch1"
                                switch="none"
                                checked={sq1}
                                onChange={handleToggleSq1}
                              />
                              <label htmlFor="square-switch1" data-on-label="Yes" data-off-label="No" />
                            </div>
                           
                          </div>
                        </div>
                      </Col> 
                    </div> */}






                     {/* <tbody>
                            {Object.entries(permission).map(([moduleName, permissionsObj]) => (
                              <tr key={moduleName}>
                                <td>{moduleName}</td>
                                <td className="permissions-column">
                                  {Object.entries(permissionsObj).map(([type, permissionsArray]) => (
                                    <div key={type}>
                                      {permissionsArray.map((perm) => (
                                        <label key={perm._id}>
                                          <input
                                            type="checkbox"
                                            checked={permissions[perm._id]?.[type]}
                                            onChange={() => handleToggles(perm._id, type)}
                                          />{' '}
                                          {perm.permission_name}
                                        </label>
                                      ))}
                                      <br />
                                    </div>
                                  ))}
                                </td>
                              </tr>
                            ))}
                          </tbody> */}



                          {/* <tbody>
                            {permission.map((module) => (
                              <tr key={module._id}>
                                <td>{module.module_name}</td>
                                <td className="permissions-column">
                                  <label>
                                    <input
                                      type="checkbox"
                                      checked={permissions[module.key]?.view}
                                      onChange={() => handleToggles(module.key, 'view')}
                                    />{' '}
                                    View
                                  </label>
                                  <br />
                                  <label>
                                    <input
                                      type="checkbox"
                                      checked={permissions[module.key]?.create}
                                      onChange={() => handleToggles(module.key, 'create')}
                                    />{' '}
                                    Create
                                  </label>
                                  <br />
                                  <label>
                                    <input
                                      type="checkbox"
                                      checked={permissions[module.key]?.edit}
                                      onChange={() => handleToggles(module.key, 'edit')}
                                    />{' '}
                                    Edit
                                  </label>
                                  <br />
                                  <label>
                                    <input
                                      type="checkbox"
                                      checked={permissions[module.key]?.delete}
                                      onChange={() => handleToggles(module.key, 'delete')}
                                    />{' '}
                                    Delete
                                  </label>
                                </td>
                              </tr>
                            ))}
                          </tbody> */}



























































//Before modify code----------------------------------------------------------------->


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
import { getAllPermissionApi, getAllSidebarMenu } from '../../services/api/authentication/authApi'


const CreateRoleForm = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [modules, setModuels] = useState([]);
  const [permission, setPermission] = useState([]);
  console.log("modules in component ", modules);
  console.log("permission permission ", permission);
  const [selectedModuleIds, setSelectedModuleIds] = useState([]);
  console.log("selectedModuleId is ", selectedModuleIds)
  const [formData, setFormData] = useState({
    name: '',
  });
  console.log(formData);

  const permissionss = [
    {
      _id: "658403b68ecdd0c7b0837d46",
      permission_name: "Create Hotel",
      description: "Permission to create hotel.",
      module: "658d52d04ffc937e8b60872b",
      route: "hotel/create",
      module_name: "Hotel",
      type: "create",
    },
    {
      _id: "658403d78ecdd0c7b0837d47",
      permission_name: "Create Room",
      description: "Permission to CreateRoom",
      module: "658e8b91a0c101cf6ce6b7c5",
      type: "create",
      module_name: "Room",
    },
    {
      _id: "658e9082a0c101cf6ce6b7c6",
      permission_name: "Create Activity",
      description: "Permission to read data",
      module: "658e8b91a0c101cf6ce6b7c5",
      type: "create",
      module_name: "Activity",
    },
    {
      _id: "659df0ffb08a006ea320c55f",
      permission_name: "Create Facility",
      description: "Permission to add Facility",
      module: "659df11eb08a006ea320c561",
      type: "create",
      module_name: "Facility",
    },
    {
      _id: "65fc1fb064c99874f1750d09",
      permission_name: "Create Hotel Category",
      description: "Permission to add Hotel Category",
      module: "65fc202764c99874f1750d12",
      type: "create",
      module_name: "Hotel",
    },
    {
      _id: "663232c421bc44964a792db4",
      permission_name: "View Sidebar Menu",
      description: "Permission to view Sidebar menu",
      module: "6632327f21bc44964a792db2",
      route: "sidebar-menus",
      type: "view",
      module_name: "SidebarMenus",
    },
    {
      _id: "6634799563d4ea8933f94db5",
      permission_name: "View Hotels",
      description: "Permission to view hotel.",
      route: "get-hotels",
      type: "view",
      module_name: "Hotel",
    },
    {
      _id: "663479ee63d4ea8933f94db8",
      permission_name: "Delete Hotels",
      description: "Permission to delete hotel.",
      route: "hotels/delete",
      type: "delete",
      module_name: "Hotel",
    },
    {
      _id: "66347a1363d4ea8933f94db9",
      permission_name: "View Room",
      description: "Permission to view room.",
      route: "rooms",
      type: "view",
      module_name: "Room",
    },
    {
      _id: "6635b95b5719d91165748842",
      permission_name: "Edit Hotels",
      description: "Permission to update hotel data.",
      route: "get-hotel",
      type: "edit",
      module_name: "Hotel",
    },
    {
      _id: "6635cd9b5719d91165748845",
      permission_name: "Delete Deals ",
      description: "Permission to delete deals",
      route: "delete-deals",
      type: "delete",
      module_name: "Deals",
    },
    {
      _id: "6635cdf25719d91165748848",
      permission_name: "Get Deals",
      description: "Permission to view deals",
      route: "get-deals",
      type: "view",
      module_name: "Deals",
    },
  ];


  // Organize permissions data by module and type
  const permissionData = {};
  permissionss.forEach((perm) => {
    const { module_name, type } = perm;
    if (!permissionData[module_name]) {
      permissionData[module_name] = {};
    }
    if (!permissionData[module_name][type]) {
      permissionData[module_name][type] = [];
    }
    permissionData[module_name][type].push(perm);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First API call
        const response = await getAllSidebarMenu();
        console.log(response.sidebarMenus)
        setModuels(response.sidebarMenus);

        // Second API call (waits for the first one to finish)
        const res = await getAllPermissionApi();
        // console.log(res.permissions)
        setPermission(res.permissions)
        // setData2(response2.data);

        // Continue with more API calls if needed...
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    };

    fetchData();

  }, []);

  const handleToggleMenuItem = (moduleId) => {
    const isSelected = selectedModuleIds.includes(moduleId);

    if (isSelected) {
      // Module is already selected, so remove it from the array
      setSelectedModuleIds(selectedModuleIds.filter(id => id !== moduleId));
    } else {
      // Module is not selected, so add it to the array
      setSelectedModuleIds([...selectedModuleIds, moduleId]);
    }
  };

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  const toggleCollapse1 = () => {
    setIsOpen1(!isOpen1);
  };

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


  const handleSubmit = () => {
    dispatch(saveRoomCategoryReq(formData));
    toastr.success("Category Saved Successfully!");
  }

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


  // Placeholder function for toggling permissions
  //  const handleToggless = (permissionId, type) => {
  //   // Implement your logic here to toggle the permission with the given ID and type
  //   console.log(`Toggled permission ${permissionId} - ${type}`);
  // };

  const [selectedPermissionIds, setSelectedPermissionIds] = useState([]);
  console.log("selectedPermissions selectedPermissions selectedPermissions", selectedPermissionIds);

  const handleSelect = (permissionId) => {
    const isSelected = selectedPermissionIds.includes(permissionId);

    // Create a new array with updated selected permission IDs
    let updatedSelectedIds;
    if (isSelected) {
      updatedSelectedIds = selectedPermissionIds.filter((id) => id !== permissionId);
    } else {
      updatedSelectedIds = [...selectedPermissionIds, permissionId];
    }

    // Update the selectedPermissionIds state with the new array
    setSelectedPermissionIds(updatedSelectedIds);
  };



  return (
    <div className="page-content">
      <Container fluid={true}>
        <Card>
          <CardBody>
            <SubHeader value={"/role"} />
            <GenralForm formFields={formFields} onChange={handleFormChange} />

            <Col xl={12}>
              <Card>
                <CardBody>
                  <h4
                    className="card-title"
                    onClick={toggleCollapse}
                    style={{ cursor: "pointer" }}>
                    Sidebar Menu <span style={{ cursor: "pointer", fontSize: 'x-large', marginLeft: '15px', fontWeight: 'bold' }}>+</span></h4>
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
                        {modules.map((module) => (
                          <tr key={module._id}>
                            <td>{module.menu}</td>
                            <td>
                              <input
                                type="checkbox"
                                id={`square-switch${module._id}`}
                                switch="none"
                                checked={selectedModuleIds.includes(module._id)}
                                onChange={() => handleToggleMenuItem(module._id)}
                              />
                              <label htmlFor={`square-switch${module._id}`} data-on-label="Yes" data-off-label="No" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Collapse>
                </CardBody>
              </Card>
            </Col>

            <Col xl={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title" onClick={toggleCollapse1} style={{ cursor: "pointer" }}>
                    Permission Menu<span style={{ cursor: "pointer", fontSize: 'x-large', marginLeft: '15px', fontWeight: 'bold' }}>+</span>
                  </h4>
                  <p className="card-title-desc">Select Permission for role</p>
                  <Collapse isOpen={isOpen1}>
                    <div className="card card-body mb-0">
                      <div className="permissions-table-container">
                        <table className="table permissions-table">
                          <thead >
                            <tr >
                              <th className="permissions-column">Module</th>
                              <th className="permissions-column">Permissions</th> {/* New column for permissions */}
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(permissionData).map(([moduleName, modulePermissions]) => (
                              <tr key={moduleName}>
                                <td>{moduleName}</td>
                                <td className="permissions-column">
                                  {Object.entries(modulePermissions).map(([type, permissionsArray]) => (
                                    <div className='d-flex align-items-center' key={type}>
                                      {permissionsArray.map((perm) => (
                                        <label className='d-flex align-items-center' key={perm._id}>
                                          <input
                                            type="checkbox"
                                            checked={selectedPermissionIds.includes(perm._id)}
                                            onChange={() => handleSelect(perm._id)}
                                          />{' '}
                                          <span className='mx-2'>{perm.type.charAt(0).toUpperCase() + perm.type.slice(1)} </span>
                                        </label>
                                      ))}
                                      <br />
                                    </div>
                                  ))}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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