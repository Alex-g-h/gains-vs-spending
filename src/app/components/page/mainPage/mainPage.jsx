import React from "react";
import Accounts from "../../ui/account";
import Analytics from "./analytics";
import Gains from "../../ui/gain";
import Spending from "../../ui/spending";

const MainPage = () => {
  // TODO: add icons to headers Gains, Accounts, Spending

  // TODO: refactor headers for Gains, Accounts, Spending with HOC

  return (
    <div className="d-flex flex-column">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-evenly">
          <Gains />
          <Accounts />
          <Spending />
        </div>
      </div>
      <div className="container-fluid">
        <Analytics />
      </div>
    </div>
  );
};

export default MainPage;
