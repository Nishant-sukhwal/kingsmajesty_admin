import React, { useState } from "react";
import {  Container } from "reactstrap";

// Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

const Dashboard = () => {

    const [breadcrumbItems] = useState([
        { title: "KingMajesty", link: "#" },
        { title: "Dashboard", link: "#" },
    ]);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                
                    <Breadcrumbs title="Dashboard" breadcrumbItems={breadcrumbItems} />

                    
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;
