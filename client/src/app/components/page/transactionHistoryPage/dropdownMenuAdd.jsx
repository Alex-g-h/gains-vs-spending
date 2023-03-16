import React from "react";
import { useNavigate } from "react-router-dom";

const DropdownMenuAdd = () => {
  const navigate = useNavigate();

  return (
    <div className="dropdown">
      <button
        className="btn p-2 border mx-1"
        type="button"
        id="dropdownMenuButton2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Add transaction <i className="bi bi-plus-circle-fill"></i>
      </button>
      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuButton2"
      >
        <li>
          <div
            onClick={() => navigate("/gain/add")}
            className="dropdown-item"
          >
            Gains
          </div>
        </li>
        <li>
          <div
            onClick={() => navigate("/spending/add")}
            className="dropdown-item"
          >
            Spending
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenuAdd;
