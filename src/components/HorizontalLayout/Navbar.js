import React, { useState, useEffect } from "react";
import { Row, Col, Collapse, Container } from "reactstrap";
import { Link } from "react-router-dom";
import classname from "classnames";

// i18n
import { withTranslation } from "react-i18next";

import { connect } from 'react-redux';
import withRouter from "../Common/withRouter";

const Navbar = ({ menuOpen, router, t }) => {
    const [uiState, setUiState] = useState(false);

    useEffect(() => {
        var matchingMenuItem = null;
        var ul = document.getElementById("navigation");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (router.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            activateParentDropdown(matchingMenuItem);
        }
    }, [router.location.pathname]);

    const activateParentDropdown = item => {
        item.classList.add("active");
        const parent = item.parentElement;
        if (parent) {
            parent.classList.add("active"); // li
            const parent2 = parent.parentElement;
            parent2.classList.add("active"); // li
            const parent3 = parent2.parentElement;
            if (parent3) {
                parent3.classList.add("active"); // li
                const parent4 = parent3.parentElement;
                if (parent4) {
                    parent4.classList.add("active"); // li
                    const parent5 = parent4.parentElement;
                    if (parent5) {
                        parent5.classList.add("active"); // li
                        const parent6 = parent5.parentElement;
                        if (parent6) {
                            parent6.classList.add("active"); // li
                        }
                    }
                }
            }
        }
    };

    return (
        <React.Fragment>
            <div className="topnav">
                <Container fluid>
                    <nav className="navbar navbar-light navbar-expand-lg topnav-menu" id="navigation">

                        <Collapse isOpen={menuOpen} className="navbar-collapse" id="topnav-menu-content">
                            <ul className="navbar-nav">

                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        <i className="ri-dashboard-line me-2"></i> {t('Dashboard')}
                                    </Link>
                                </li>

                                <li className="nav-item dropdown">
                                    <Link
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setUiState(!uiState);
                                        }}
                                        className={classname("nav-link dropdown-toggle arrow-none", { show: uiState })}
                                        to="/#"
                                        id="topnav-uielement"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i className="ri-pencil-ruler-2-line me-2"></i>
                                        {t('UI Elements')}
                                        <div className="arrow-down"></div>
                                    </Link>

                                    <div
                                        className={classname("dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-xl", { show: uiState })}
                                        aria-labelledby="topnav-uielement"
                                    >
                                        <Row>
                                            <Col lg={4}>
                                                <div>
                                                    <Link to="#" className="dropdown-item">{t('Alerts')}</Link>
                                                    <Link to="#" className="dropdown-item">{t('Buttons')}</Link>
                                                    <Link to="#" className="dropdown-item">{t('Cards')}</Link>
                                                    <Link to="#" className="dropdown-item">{t('Carousel')}</Link>
                                                    <Link to="#" className="dropdown-item">{t('Dropdowns')}</Link>
                                                    <Link to="#" className="dropdown-item">{t('Grid')}</Link>
                                                    <Link to="#" className="dropdown-item">{t('Images')}</Link>
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div>
                                                    <Link to="#" className="dropdown-item">{t('Lightbox')}</Link>
                                                    <Link to="#" className="dropdown-item">{t('Modals')}</Link>
                                                    <Link to="#" className="dropdown-item">{t('Range Slider')}</Link>
                                                    <Link to="#" className="dropdown-item">{t('Round slider')}</Link>
                                                    <Link to="#" className="dropdown-item">{t('Session Timeout')}</Link>
                                                    <Link to="#" className="dropdown-item">{t('Progress Bars')}</Link>
                                                    <Link to="#" className="dropdown-item">{t('Sweet-Alert')}</Link>
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div>
                                                    <Link to="#" className="dropdown-item">{t('Tabs & Accordions')}</Link>
                                                    <Link to="#" className="dropdown-item">{t('Typography')}</Link>
                                                    <Link to="#" className="dropdown-item">{t('Video')}</Link>
                                                    <Link to="#" className="dropdown-item">{t('General')}</Link>
                                                    <Link to="#" className="dropdown-item">{t('Rating')}</Link>
                                                    <Link to="#" className="dropdown-item">{t('Notifications')}</Link>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </li>
                            </ul>
                        </Collapse>
                    </nav>
                </Container>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    const { leftSideBarType, leftSideBarTheme } = state.Layout;
    return { leftSideBarType, leftSideBarTheme };
};

export default withRouter(connect(mapStateToProps, {})(withTranslation()(Navbar)));
