import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/user";

const NavProfile = () => {
  const [isOpen, setOpen] = useState(false);
  const { name: userName } = useSelector(getCurrentUserData());

  const toggleDropdown = () => {
    setOpen((prevState) => !prevState);
  };

  // add click outside event
  useEffect(() => {
    document.addEventListener("click", (event) => {
      const navProfileHTML = document.querySelector("#nav-profile");

      let { target } = event;
      do {
        if (target === navProfileHTML) return; // ignore click in this handler while clicked on ROI

        target = target.parentNode; // climbing up in the DOM tree
      } while (target);

      // hide menu if clicked outside
      setOpen(false);
    });
  }, []);

  return (
    <div
      className="dropdown"
      id="nav-profile"
      onClick={toggleDropdown}
    >
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{userName}</div>
        <i
          className="bi bi-person-circle"
          style={{ color: "#d6d3d1", fontSize: "2rem" }}
        ></i>
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link
          to="/"
          className="dropdown-item"
        >
          Profile
        </Link>
        <Link
          to="/logout"
          className="dropdown-item"
        >
          Log out
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
