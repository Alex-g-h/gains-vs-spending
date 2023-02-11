/* eslint-disable react/display-name */
import React from "react";
import { BrowserRouter } from "react-router-dom";

const withRouter =
  (Component) =>
  ({ ...props }) => {
    return (
      <BrowserRouter basename="/gains-vs-spending">
        <Component {...props} />
      </BrowserRouter>
    );
  };

export default withRouter;
