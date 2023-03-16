import React, { useState } from "react";
import PropTypes from "prop-types";

const filterOptions = [
  {
    orderBy: "date",
    dir: "asc",
    text: "Early first",
  },
  {
    orderBy: "date",
    dir: "desc",
    text: "Later first",
  },
  {
    orderBy: "amount",
    dir: "asc",
    text: "Increasing amount",
  },
  {
    orderBy: "amount",
    dir: "desc",
    text: "Decreasing amount",
  },
];

const DropdownFilter = ({ handleFilter }) => {
  const [filterOptionsIndex, setFilterOptionsIndex] = useState(0);

  const handleFilterClick = (filterIndex) => {
    setFilterOptionsIndex(filterIndex);
    handleFilter(filterOptions[filterIndex]);
  };

  return (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle p-2 border mx-1"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Filter <i className="bi bi-filter"></i>
      </button>
      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuButton1"
      >
        {filterOptions.map((f, index) => (
          <li key={index}>
            <div
              onClick={() => handleFilterClick(index)}
              className={
                index === filterOptionsIndex
                  ? "dropdown-item active"
                  : "dropdown-item"
              }
            >
              {f.text}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

DropdownFilter.propTypes = {
  handleFilter: PropTypes.func,
};

export default DropdownFilter;
