import React, { useEffect, useState } from 'react'
import GenralForm from '../../components/Form/GenricForm/GenralForm'
import { Button, Card, CardBody, Container } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { saveRoomCategoryReq } from '../../store/roomCategory/actions'
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import SubHeader from '../../components/Common/SubHeader'
import { createTeamMemberAPI, getRoleApi } from '../../services/api/teamMemberApi'

const CreateTeamForm = () => {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({});

  const fetchRole = async () => {
    const res = await getRoleApi();
    const transformedRoles = res.roles.map(role => ({
      value: role._id,
      label: role.role_name
    }));
    setRoles(transformedRoles);
  };

  useEffect(() => {
    fetchRole();
  }, [])


  const handleFormChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const formFields = {
    backbutton: '/team',
    form: [
      { fieldName: 'firstname', label: 'First Name', type: 'text', errorMessage: 'Enter First Name', value: '', placeholder: 'Enter First Name' },
      { fieldName: 'lastname', label: 'Last Name', type: 'text', errorMessage: 'EnterLast Name', value: '', placeholder: 'Enter Last Name' },
      { fieldName: "email", label: "Email", type: 'email', required: true, errorMessage: "Please Enter Email", placeholder: "Enter Email Address" },
      { fieldName: "phonenumber", label: "Mobile", type: 'number', required: true, errorMessage: "Please Enter Mobile Number", placeholder: "Enter Mobile Number" },
      { fieldName: 'password', label: 'Password', type: 'password', errorMessage: 'Enter Password', value: '', placeholder: 'Enter Password' },
      { fieldName: 'cpassword', label: 'Confirm Password', type: 'password', errorMessage: 'Enter Confirm Password', value: '', placeholder: 'Enter Confirm Password' },
      { fieldName: "role", label: "Role", type: "select", errorMessage: "Please Select Role", placeholder: "Select Role", isMulti: false, options: roles },
    ]
  }

  const handleSubmit = async () => {
    console.log("formData", formData);
    try {
      await createTeamMemberAPI(formData);
      toastr.success("Team Member created successfully");
    } catch (error) {
      console.error(error);
      toastr.error("Failed to create Team Member");
    }
  }

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Card>
          <CardBody>
            <SubHeader value={"/team"} />
            <GenralForm formFields={formFields} onChange={handleFormChange} />
            <Button color="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

export default CreateTeamForm;