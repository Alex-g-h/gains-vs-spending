import React from "react";
import Accounts from "../../ui/account/accounts";
import Analytics from "./analytics";
import Gains from "./gains";
import Spending from "./spending";

const MainPage = () => {
  // TODO: add icons to headers Gains, Accounts, Spending

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
        <Analytics />
      </div>
    </div>
  );
};

export default MainPage;
