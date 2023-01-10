import React from "react";
import { Link } from "react-router-dom";
import BrandLogo from "../../../images/brand_wo_bg.png";
import NavProfile from "./navProfile";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm  bg-light mb-3">
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
        >
          <img
            src={BrandLogo}
            alt="Gains vs Spending"
            height="50"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul
            // className="nav nav-pills me-auto"
            className="navbar-nav me-auto mb-2 mb-lg-0"
            role="tablist"
          >
            <li
              className="nav-item"
              role="presentation"
            >
              <Link
                className="nav-link"
                to="/"
                id="main-tab"
                data-bs-toggle="pills"
                data-bs-target="#main"
                type="button"
                role="tab"
                aria-controls="main"
                aria-selected="true"
              >
                Main
              </Link>
            </li>
            <li
              className="nav-item"
              role="presentation"
            >
              <Link
                className="nav-link"
                to="/history"
              >
                History
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <NavProfile />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
