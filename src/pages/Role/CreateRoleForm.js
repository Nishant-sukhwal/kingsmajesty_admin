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
import { createRoleApi } from '../../services/api/roleApi'


const CreateRoleForm = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [modules, setModuels] = useState([]);
  const [permission, setPermission] = useState([]);

  const [selectedPermissionIds, setSelectedPermissionIds] = useState([]);
  const [selectedModuleIds, setSelectedModuleIds] = useState([]);
  const [roleName, setRoleName] = useState({
    name: '',
  });

  console.log(roleName);
  console.log("modules in component ", modules);
  console.log("permission permission ", permission);
  console.log("selectedModuleId is ", selectedModuleIds)
  console.log("selectedPermissions selectedPermissions selectedPermissions", selectedPermissionIds);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllSidebarMenu();
        console.log(response.sidebarMenus)
        setModuels(response.sidebarMenus);
        // Second API call (waits for the first one to finish)
        const res = await getAllPermissionApi();
        // console.log(res.permissions)
        setPermission(res.permissions)
        // setData2(response2.data);        
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    };
    fetchData();
  }, []);

  const handleFormChange = (fieldName, value) => {
    setRoleName({
      ...roleName,
      [fieldName]: value,
    });
  };


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


  // Organize permissions data by module and type
  const permissionData = {};
  permission.forEach((perm) => {
    const { module_name, type } = perm;
    if (!permissionData[module_name]) {
      permissionData[module_name] = {};
    }
    if (!permissionData[module_name][type]) {
      permissionData[module_name][type] = [];
    }
    permissionData[module_name][type].push(perm);
  });

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

  const handleSubmit = async () => {
    const formDataToSend = {
      role_name: roleName.name, // Assuming 'name' is the role name field
      sidebarMenus: selectedModuleIds,
      permissions: selectedPermissionIds,
    };

    console.log("Submit --------------->", formDataToSend)
    try {
      const res = await createRoleApi(formDataToSend);
      console.log("response is here", res);
      toastr.success("Category Saved Successfully!");
    } catch (error) {
      console.log("error", error)
      toastr.error("Category Saved Successfully!");
    }
    // dispatch(saveRoomCategoryReq(formData));
    // toastr.success("Category Saved Successfully!");
  }

  const formFields = {
    backbutton: '/role',
    form: [
      {
        fieldName: 'name',
        label: 'Role Name',
        type: 'text',
        errorMessage: 'Enter Role Name',
        value: '',
        placeholder: 'Enter Role Name'
      },
    ]
  }

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Card>
          <CardBody>
            <SubHeader value={"/role"} />
            <GenralForm formFields={formFields} onChange={handleFormChange} />
            {/* Sidebar Menu */}
            <Col xl={12}>
              <Card>
                <CardBody>
                  <h4
                    className="card-title"
                    onClick={toggleCollapse}
                    style={{ cursor: "pointer" }}>
                    Sidebar Menu <span style={{ cursor: "pointer", fontSize: 'x-large', marginLeft: '15px', fontWeight: 'bold' }}>+</span></h4>
                  <p className="card-title-desc">Select the specific sidebar menus to be accessible for this role.</p>
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
            {/* permission menu */}
            <Col xl={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title" onClick={toggleCollapse1} style={{ cursor: "pointer" }}>
                    Permission Menu<span style={{ cursor: "pointer", fontSize: 'x-large', marginLeft: '15px', fontWeight: 'bold' }}>+</span>
                  </h4>
                  <p className="card-title-desc">Customize role permissions to define specific access rights and privileges for user roles.</p>
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
                                  {Object.entries(modulePermissions)
                                    .sort(([typeA], [typeB]) => {
                                      const order = ['View', 'Create', 'Edit', 'Delete'];
                                      return order.indexOf(typeA) - order.indexOf(typeB);
                                    })
                                    .map(([type, permissionsArray]) => (
                                      <div className='d-flex align-items-center' key={type}>
                                        {permissionsArray.map((perm) => (
                                          <label className='d-flex align-items-center' key={perm._id}>
                                            <input
                                              type="checkbox"
                                              checked={selectedPermissionIds.includes(perm._id)}
                                              onChange={() => handleSelect(perm._id)}
                                            />{' '}
                                            <span className='mx-2'>{perm?.type?.charAt(0).toUpperCase() + perm?.type?.slice(1)} </span>
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
            {/* Submit Button*/}
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