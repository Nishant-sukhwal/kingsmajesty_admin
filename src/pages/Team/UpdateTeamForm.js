import React, { useEffect, useState } from "react";
import { Form, Card, CardBody, Container, Button } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import SubHeader from "../../components/Common/SubHeader";
import GenralForm from "../../components/Form/GenricForm/GenralForm";
import { getRoleApi, getTeamMembersByIdAPI, teamMembersUpdateApi } from "../../services/api/teamMemberApi";

const UpdateTeamForm = () => {
  const [breadcrumbItems] = useState([
    { title: "KingMajesty", link: "/" },
    { title: "Update Hotel Category", link: "#" },
  ]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [formData, setFormData] = useState({});
  const [fetchedData, setFetchedData] = useState({});
  const [roles, setRoles] = useState([]);

  const handleFormChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const fetchRole = async () => {
    const res = await getRoleApi();
    const transformedRoles = res.roles.map(role => ({
      value: role._id,
      label: role.role_name
    }));
    setRoles(transformedRoles);
  };

  const fetchData = async () => {
    try {
      const data = await getTeamMembersByIdAPI(id);
      console.log(data.data.teamMember);
      setFetchedData((prevData) => ({
        ...prevData,
        firstname: data.data.teamMember.firstname,
        lastname: data.data.teamMember.lastname,
        password: data.data.teamMember.password,
        phonenumber: data.data.teamMember.phonenumber,
        email: data.data.teamMember.email,
        role: data.data.teamMember.role,
      }));
      setFormData((prevData) => ({
        ...prevData,
        firstname: data.data.teamMember.firstname,
        lastname: data.data.teamMember.lastname,
        password: data.data.teamMember.password,
        phonenumber: data.data.teamMember.phonenumber,
        email: data.data.teamMember.email,
        role: data.data.teamMember.role,
      }));
    } catch (error) {
      console.error("Error fetching Room Category data:", error);
    }
  };

  useEffect(() => {
    fetchRole();
    fetchData();
  }, [id])

  // useEffect(() => {
  //   fetchData();
  // }, [id]);


  // Function to handle form submission
  const handleSubmit = async (e, errors) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await teamMembersUpdateApi(formData, id);
      console.log(res);

      toastr.success("Team Member updated successfully!", "Success");
    } catch (error) {
      toastr.error("An error occurred. Please try again.", "Error");
    }
  };

  const formFields = {
    backbutton: '/team',
    form: [
      { fieldName: 'firstname', label: 'First Name', type: 'text', errorMessage: 'Enter First Name', value: '', placeholder: 'Enter First Name', defaultValue: fetchedData?.firstname },
      { fieldName: 'lastname', label: 'Last Name', type: 'text', errorMessage: 'EnterLast Name', value: '', placeholder: 'Enter Last Name', defaultValue: fetchedData?.lastname },
      { fieldName: "email", label: "Email", type: 'email', required: true, errorMessage: "Please Enter Email", placeholder: "Enter Email Address", defaultValue: fetchedData?.email },
      { fieldName: "phonenumber", label: "Mobile", type: 'number', required: true, errorMessage: "Please Enter Mobile Number", placeholder: "Enter Mobile Number", defaultValue: fetchedData?.phonenumber },
      { fieldName: 'password', label: 'Password', type: 'password', errorMessage: 'Enter Password', value: '', placeholder: 'Enter Password' },
      { fieldName: 'cpassword', label: 'Confirm Password', type: 'password', errorMessage: 'Enter Confirm Password', value: '', placeholder: 'Enter Confirm Password' },
      { fieldName: "role", label: "Role", type: "select", errorMessage: "Please Select Role", placeholder: "Select Role", isMulti: false, options: roles, defaultValue: fetchedData?.role },
    ]
  }


  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs
          title="Update Facilities"
          breadcrumbItems={breadcrumbItems}
        />
        <Form>
          <Card>
            <CardBody>
              <SubHeader value={"/team"} />
              <GenralForm formFields={formFields} onChange={handleFormChange} />
              <Button color="primary" type="submit" onClick={handleSubmit}>
                Update
              </Button>
            </CardBody>
          </Card>
        </Form>
      </Container>
    </div>
  );
};

export default UpdateTeamForm;
