import React from "react";
import { connect } from "react-redux";
import SimpleBar from "simplebar-react";
import SidebarContent from "./SidebarContent";
import withRouter from "../Common/withRouter";

const Sidebar = ({ type }) => {
  return (
    <>
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          {type !== "condensed" ? (
            <SimpleBar style={{ maxHeight: "100%" }}>
              <SidebarContent type={"Notcondensed"} />
            </SimpleBar>
          ) : (
            <SidebarContent type={"condensed"} />
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, {})(withRouter(Sidebar));
