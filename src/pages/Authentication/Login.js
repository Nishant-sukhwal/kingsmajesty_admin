import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Button, Container, Label } from "reactstrap";
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { checkLogin, apiError, loginUser } from '../../store/actions';
import logodark from "../../assets/images/logo-darks.png";
// import logolight from "../../assets/images/logo-lights.png";

import withRouter from '../../components/Common/withRouter';
import { useNavigate } from 'react-router-dom';
import  { login } from '../../services/api/authentication/authApi';
// import login from '../../store/auth/login/reducer';
// import axios from 'axios';

const Login = ({ checkLogin, apiError, loginError, history }) => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();
   const dispatch = useDispatch();
   const token = useSelector((state) => state.Login.tokens.token);  
    const handleSubmit = async (event, values) => {
        try {
            // login(formData,dispatch)
            dispatch(loginUser(formData));
            // navigate('/dashboard');
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error during API call:', error);
            apiError('An error occurred. Please try again later.');
        }
    };

    useEffect(() => {
        if(token){
            navigate('/dashboard');            
        }       
    }, [token]);

    return (
        <React.Fragment>
            <div>
                <Container fluid className="p-0">
                    <Row className="g-0">
                        <Col lg={4}>
                            <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                                <div className="w-100">
                                    <Row className="justify-content-center">
                                        <Col lg={9}>
                                            <div>
                                                <div className="text-center">
                                                    <div>
                                                        <Link to="#" className="">
                                                            <img src={logodark} alt="" height="50" className="auth-logo logo-dark mx-auto" />
                                                            <img src={logodark} alt="" height="50" className="auth-logo logo-light mx-auto" />
                                                        </Link>
                                                    </div>

                                                    <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                                                    <p className="text-muted">Sign in to continue to KingMajesty.</p>
                                                </div>
                                                {/* {loginError && loginError ? <Alert color="danger">{loginError}</Alert> : null} */}
                                                <div className="p-2 mt-5">
                                                    <AvForm className="form-horizontal" onValidSubmit={handleSubmit}>

                                                        <div className="auth-form-group-custom mb-4">
                                                            <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                            <Label htmlFor="username">Email</Label>
                                                            <AvField name="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} type="text" className="form-control" id="username" validate={{ email: true, required: true }} placeholder="Enter username" />
                                                        </div>

                                                        <div className="auth-form-group-custom mb-4">
                                                            <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                            <Label htmlFor="userpassword">Password</Label>
                                                            <AvField name="password" value={formData.password}  autoComplete="on" onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" className="form-control" id="userpassword" placeholder="Enter password" />
                                                        </div>

                                                        <div className="form-check">
                                                            <Input type="checkbox" className="form-check-input" id="customControlInline" />
                                                            <Label className="form-check-label" htmlFor="customControlInline">Remember me</Label>
                                                        </div>

                                                        <div className="mt-4 text-center">
                                                            <Button color="primary" className="w-md waves-effect waves-light" type="submit">Log In</Button>
                                                        </div>

                                                        <div className="mt-4 text-center">
                                                            <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock me-1"></i> Forgot your password?</Link>
                                                        </div>
                                                    </AvForm>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p>Don't have an account ? <Link to="/register" className="fw-medium text-primary"> Register </Link> </p>
                                                    <p>© 2024 Kingmajesty. Crafted with <i className="mdi mdi-heart text-danger"></i> by Idea2Reality</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <div className="authentication-bg">
                                <div className="bg-overlay"></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

const mapStatetoProps = state => {
    const { loginError, user } = state.Login;

    return { loginError, user };
};

export default withRouter(connect(mapStatetoProps, { checkLogin, apiError })(Login));






//Without Redux code

// import React, { useState } from 'react';
// import { Row, Col, Input, Button, Container, Label } from "reactstrap";
// import { connect, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { AvForm, AvField } from 'availity-reactstrap-validation';
// import { checkLogin, apiError } from '../../store/actions';
// import logodark from "../../assets/images/logo-darks.png";
// // import logolight from "../../assets/images/logo-lights.png";

// import withRouter from '../../components/Common/withRouter';
// import { useNavigate } from 'react-router-dom';
// import  { login } from '../../services/api/authentication/authApi';
// // import login from '../../store/auth/login/reducer';
// // import axios from 'axios';

// const Login = ({ checkLogin, apiError, loginError, history }) => {
//     const [formData, setFormData] = useState({ username: "", password: "" });
//     const navigate = useNavigate();
//    const dispatch = useDispatch();

//     const handleSubmit = async (event, values) => {

//         //  checkLogin(values, navigate);

//         try {
//             login(formData,dispatch)
//             navigate('/dashboard');
//         } catch (error) {
//             // Handle network errors or other exceptions
//             console.error('Error during API call:', error);
//             apiError('An error occurred. Please try again later.');
//         }

//     };

//     // useEffect(() => {
//     //     apiError("");
//     //     document.body.classList.add("auth-body-bg");

//     //     return () => {
//     //         document.body.classList.remove("auth-body-bg");
//     //     };
//     // }, [apiError]);

//     return (
//         <React.Fragment>
//             <div>
//                 <Container fluid className="p-0">
//                     <Row className="g-0">
//                         <Col lg={4}>
//                             <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
//                                 <div className="w-100">
//                                     <Row className="justify-content-center">
//                                         <Col lg={9}>
//                                             <div>
//                                                 <div className="text-center">
//                                                     <div>
//                                                         <Link to="#" className="">
//                                                             <img src={logodark} alt="" height="50" className="auth-logo logo-dark mx-auto" />
//                                                             <img src={logodark} alt="" height="50" className="auth-logo logo-light mx-auto" />
//                                                         </Link>
//                                                     </div>

//                                                     <h4 className="font-size-18 mt-4">Welcome Back !</h4>
//                                                     <p className="text-muted">Sign in to continue to KingMajesty.</p>
//                                                 </div>
//                                                 {/* {loginError && loginError ? <Alert color="danger">{loginError}</Alert> : null} */}
//                                                 <div className="p-2 mt-5">
//                                                     <AvForm className="form-horizontal" onValidSubmit={handleSubmit}>

//                                                         <div className="auth-form-group-custom mb-4">
//                                                             <i className="ri-user-2-line auti-custom-input-icon"></i>
//                                                             <Label htmlFor="username">Email</Label>
//                                                             <AvField name="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} type="text" className="form-control" id="username" validate={{ email: true, required: true }} placeholder="Enter username" />
//                                                         </div>

//                                                         <div className="auth-form-group-custom mb-4">
//                                                             <i className="ri-lock-2-line auti-custom-input-icon"></i>
//                                                             <Label htmlFor="userpassword">Password</Label>
//                                                             <AvField name="password" value={formData.password}  autoComplete="on" onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" className="form-control" id="userpassword" placeholder="Enter password" />
//                                                         </div>

//                                                         <div className="form-check">
//                                                             <Input type="checkbox" className="form-check-input" id="customControlInline" />
//                                                             <Label className="form-check-label" htmlFor="customControlInline">Remember me</Label>
//                                                         </div>

//                                                         <div className="mt-4 text-center">
//                                                             <Button color="primary" className="w-md waves-effect waves-light" type="submit">Log In</Button>
//                                                         </div>

//                                                         <div className="mt-4 text-center">
//                                                             <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock me-1"></i> Forgot your password?</Link>
//                                                         </div>
//                                                     </AvForm>
//                                                 </div>

//                                                 <div className="mt-5 text-center">
//                                                     <p>Don't have an account ? <Link to="/register" className="fw-medium text-primary"> Register </Link> </p>
//                                                     <p>© 2024 Kingmajesty. Crafted with <i className="mdi mdi-heart text-danger"></i> by Idea2Reality</p>
//                                                 </div>
//                                             </div>
//                                         </Col>
//                                     </Row>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col lg={8}>
//                             <div className="authentication-bg">
//                                 <div className="bg-overlay"></div>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         </React.Fragment>
//     );
// };

// const mapStatetoProps = state => {
//     const { loginError, user } = state.Login;

//     return { loginError, user };
// };

// export default withRouter(connect(mapStatetoProps, { checkLogin, apiError })(Login));
