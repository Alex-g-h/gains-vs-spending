import React from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/ui/navbar";
import withRouter from "./hoc/withRouter";
import withRedux from "./hoc/withRedux";
import routes from "./routes";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "./store/user";
import AppLoader from "./hoc/appLoader";
import "./app.css";

function App() {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const location = useLocation();
  const elements = useRoutes(routes(isLoggedIn, location));

  return (
    <div className="page-background">
      <AppLoader>
        <NavBar />
        {elements}
      </AppLoader>
      <ToastContainer />
    </div>
  );
}

const AppWithStoreAndRoutes = withRedux(withRouter(App));
export default AppWithStoreAndRoutes;
