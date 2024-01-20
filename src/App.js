import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes";

// layouts
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";

//Fake backend
// import fakeBackend from './helpers/AuthType/fakeBackend';
import AppRoute from "./routes/route";
import { checkLogin } from "./store/actions";



// Activating fake backend
// fakeBackend();

const App = ({ layout }) => {
  const dispatch = useDispatch();
  /**
   * Returns the layout
   */
  const getLayout = () => {
    let layoutCls = VerticalLayout;

    switch (layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  };

  useEffect(()=>{
    dispatch(checkLogin());
  }, []);

  const Layout = getLayout();

  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <NonAuthLayout>
                {route.component}
              </NonAuthLayout>
            }
            key={idx}
            exact={true}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <AppRoute>
                <Layout>{route.component}</Layout>
              </AppRoute>
            }
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
