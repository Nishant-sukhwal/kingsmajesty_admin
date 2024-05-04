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
  console.log("permission permission ",permission);
  const [selectedModuleIds, setSelectedModuleIds] = useState([]);
  console.log("selectedModuleId is ", selectedModuleIds)
  const [formData, setFormData] = useState({
    name: '',
  });
  console.log(formData);

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


  // Simulated API response with module data
  // const modules = [
  //   {
  //     "_id": "659501b4bde1213351e1f2de",
  //     "menu": "Dashboard"
  //   },
  //   {
  //     "_id": "659502a1bde1213351e1f2e3",
  //     "menu": "Hotels"
  //   },
  // ];


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
                              {/*
                              <td>
                                <input
                                  type="checkbox"
                                  id={`square-switch${module._id}`}
                                  switch="none"
                                  checked={selectedModuleIds.includes(module._id)}
                                  onChange={() => handleToggleMenuItem(module._id)}
                                />
                                <label htmlFor={`square-switch${module._id}`} data-on-label="Yes" data-off-label="No" />
                              </td> */}
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