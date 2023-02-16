import React from "react";
import Accounts from "../../ui/account/accounts";
import Analitics from "./analitics";
import Gains from "./gains";
import Spending from "./spending";

const MainPage = () => {
  return (
    <div className="d-flex flex-column">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-evenly">
          <Gains />
          <Accounts />
          <Spending />
        </div>
      </div>
      <div className="container-fluid mt-4">
        <Analitics />
      </div>
    </div>
  );
};

export default MainPage;
