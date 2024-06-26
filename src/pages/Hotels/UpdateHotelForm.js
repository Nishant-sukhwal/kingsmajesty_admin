import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Card, CardBody, TabContent, TabPane, NavItem, NavLink, Label, Input, Form, Container, Button } from "reactstrap";
import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import BasicInfoForm from "./HotelEditFormComponets/BasicInfoForm";
import LocationForm from "./HotelEditFormComponets/LocationForm";
import MediaForm from "./HotelEditFormComponets/MediaForm";
import FacilitiesForm from "./HotelEditFormComponets/FacilitiesForm";
import PropertyRulesForm from "./HotelEditFormComponets/PropertyRulesForm";
import SubHeader from "../../components/Common/SubHeader";
import { useLocation } from "react-router-dom";
import { getHotelByIdApi } from "../../services/api/hotel/hotelCreateApi";
import { getHotelById } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const UpdateHotelForm = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isBasicInfoFormSubmitted, setIsBasicInfoFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const basicInfoFormRef = useRef(null);
  const locationFormRef = useRef(null);
  const mediaFormRef = useRef(null);
  const propertyRulesFormRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id")
  const facilitiesFormRef = useRef(null);
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.Hotel.data);  
  // console.log("data from redux store in  the update component ", hotels)
  const toggleTab = (tab) => {
    if (activeTab !== tab && tab >= 1 && tab <= 5) {
      setActiveTab(tab);
    }
  };
  const isLastTab = activeTab === 5;
  const isSaveAndNext = activeTab <= 4;
  const nextButtonText = isLastTab
    ? "Submit"
    : isSaveAndNext
      ? "Update & Next"
      : "Next";

  const handleSubmit = async () => {
    // Call the submitForm method of the current tab
    switch (activeTab) {
      case 1:
        basicInfoFormRef.current.submitForm();
        break;
      case 2:
        locationFormRef.current.submitForm();
        break;
      case 3:
        mediaFormRef.current.submitForm();
        break;
      case 4:
        propertyRulesFormRef.current.submitForm();
        break;
      case 5:
        facilitiesFormRef.current.submitForm();
        break;
      default:
        break;
    }
  };

  const handleBasicInfoSubmitSuccess = () => {
    // Move to the next tab
    toggleTab(activeTab + 1);
    setIsBasicInfoFormSubmitted(true);
  };

  useEffect(() => {
    const fetchHotel = async () => {
        try {
            // Fetch data from your API endpoint
            const data = await getHotelByIdApi(id)
            dispatch(getHotelById(data.hotel,));
            // console.log("hotel data in component for update",data.hotel)
        } catch (error) {
            console.error("Error fetching hotel:", error);
        }
    };

    fetchHotel();
}, [id]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Hotel"
            breadcrumbItems={[] /* Add your breadcrumb items here */}
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  {/* Header */}
                  <SubHeader value="/hotels" />
                  {/* Heading */}
                  <h4 className="card-title mb-4">Create Hotel</h4>
                  {/* Form */}
                  <div id="basic-pills-wizard" className="twitter-bs-wizard">
                    <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                      {[1, 2, 3, 4, 5].map((tab) => (
                        <NavItem key={tab} disabled={tab > 1 && !isBasicInfoFormSubmitted}>
                          <NavLink
                            className={classnames({
                              active: activeTab === tab,
                            })}
                            onClick={() => toggleTab(tab)}
                          >
                            <span className="step-number">0{tab}</span>
                            <span className="step-title">
                              {(() => {
                                switch (tab) {
                                  case 1:
                                    return "Basic Info";
                                  case 2:
                                    return "Location";
                                  case 3:
                                    return "Media";
                                  case 4:
                                    return "Property Rules";
                                  case 5:
                                    return "Facilities & Deals";
                                  default:
                                    return "";
                                }
                              })()}
                            </span>
                          </NavLink>
                        </NavItem>
                      ))}
                    </ul>
                    <TabContent
                      activeTab={activeTab}
                      className="twitter-bs-wizard-tab-content"
                    >
                      {[1, 2, 3, 4, 5].map((tab) => (
                        <TabPane key={tab} tabId={tab}>
                          {tab === 1 && <BasicInfoForm ref={basicInfoFormRef} onSubmitSuccess={handleBasicInfoSubmitSuccess} />}
                          {tab === 2 && <LocationForm ref={locationFormRef} onSubmitSuccess={handleBasicInfoSubmitSuccess} />}
                          {tab === 3 && <MediaForm ref={mediaFormRef} onSubmitSuccess={handleBasicInfoSubmitSuccess} />}
                          {tab === 4 && <PropertyRulesForm ref={propertyRulesFormRef} onSubmitSuccess={handleBasicInfoSubmitSuccess} />}
                          {tab === 5 && <FacilitiesForm ref={facilitiesFormRef} onSubmitSuccess={handleBasicInfoSubmitSuccess} />}
                        </TabPane>
                      ))}
                    </TabContent>
                    <ul className="pager wizard twitter-bs-wizard-pager-link">
                      <li
                        className={
                          activeTab === 1 ? "previous disabled" : "previous"
                        }
                      >
                        <Link to="#" onClick={() => toggleTab(activeTab - 1)}>
                          Previous
                        </Link>
                      </li>
                      <li
                        className={activeTab === 6 ? "next disabled" : "next"}
                      >
                        <Link to="#" onClick={handleSubmit} >
                          {nextButtonText}
                        </Link>
                      </li>
                    </ul>
                  </div>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UpdateHotelForm;






























// import React, { useRef, useState } from "react";
// import {
//   Row,
//   Col,
//   Card,
//   CardBody,
//   TabContent,
//   TabPane,
//   NavItem,
//   NavLink,
//   Label,
//   Input,
//   Form,
//   Container,
// } from "reactstrap";
// import classnames from "classnames";
// import { Link } from "react-router-dom";
// import Breadcrumbs from "../../components/Common/Breadcrumb";
// // import SellerDetailsForm from "./SellerDetailsForm";
// // import CompanyDocumentForm from "./CompanyDocumentForm";
// import BasicInfoForm from "./HotelFormComponets/BasicInfoForm";
// import LocationForm from "./HotelFormComponets/LocationForm";
// import MediaForm from "./HotelFormComponets/MediaForm";

// import FacilitiesForm from "./HotelFormComponets/FacilitiesForm";
// import PropertyRulesForm from "./HotelFormComponets/PropertyRulesForm";

// const CreateHotel = () => {
//   const [activeTab, setActiveTab] = useState(1);

//   const toggleTab = (tab) => {
//     if (activeTab !== tab && tab >= 1 && tab <= 5) {
//       setActiveTab(tab);
//     }
//   };

//   const isLastTab = activeTab === 5;
//   const isSaveAndNext = activeTab <= 4;

//   const nextButtonText = isLastTab
//     ? "Submit"
//     : isSaveAndNext
//     ? "Save & Next"
//     : "Next";


//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid={true}>
//           <Breadcrumbs
//             title="Hotel"
//             breadcrumbItems={[] /* Add your breadcrumb items here */}
//           />
//           <Row>
//             <Col lg="12">
//               <Card>
//                 <CardBody>
//                   <h4 className="card-title mb-4">Create Hotel</h4>

//                   <div id="basic-pills-wizard" className="twitter-bs-wizard">
//                     <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
//                       {[1, 2, 3, 4, 5].map((tab) => (
//                         <NavItem key={tab}>
//                           <NavLink
//                             className={classnames({
//                               active: activeTab === tab,
//                             })}
//                             onClick={() => toggleTab(tab)}
//                           >
//                             <span className="step-number">0{tab}</span>
//                             <span className="step-title">
//                               {(() => {
//                                 switch (tab) {
//                                   case 1:
//                                     return "Basic Info";
//                                   case 2:
//                                     return "Location";
//                                   case 3:
//                                     return "Media";
//                                   case 4:
//                                     return "Property Rules";
//                                   case 5:
//                                     return "Facilities & Deals";
//                                   default:
//                                     return "";
//                                 }
//                               })()}
//                             </span>
//                           </NavLink>
//                         </NavItem>
//                       ))}
//                     </ul>

//                     <TabContent
//                       activeTab={activeTab}
//                       className="twitter-bs-wizard-tab-content"
//                     >
//                       {[1, 2, 3, 4, 5].map((tab) => (
//                         <TabPane key={tab} tabId={tab}>
//                           {tab === 1 && <BasicInfoForm  />}
//                           {tab === 2 && <LocationForm />}
//                           {tab === 3 && <MediaForm />}
//                           {tab === 4 && <PropertyRulesForm />}
//                           {tab === 5 && <FacilitiesForm />}
//                         </TabPane>
//                       ))}
//                     </TabContent>

//                     <ul className="pager wizard twitter-bs-wizard-pager-link">
//                       <li
//                         className={
//                           activeTab === 1 ? "previous disabled" : "previous"
//                         }
//                       >
//                         <Link to="#" onClick={() => toggleTab(activeTab - 1)}>
//                           Previous
//                         </Link>
//                       </li>
//                       <li
//                         className={activeTab === 6 ? "next disabled" : "next"}
//                       >
//                         <Link to="#" onClick={() => toggleTab(activeTab + 1)}>
//                           {nextButtonText}
//                         </Link>
//                       </li>
//                     </ul>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default CreateHotel;
