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