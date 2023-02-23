import React from "react";
import Accounts from "../../ui/account";
import Analytics from "./analytics";
import Gains from "../../ui/gain";
import Spending from "../../ui/spending";

const MainPage = () => {
  // TODO: add icons to headers Gains, Accounts, Spending

  // TODO: refactor headers for Gains, Accounts, Spending with HOC

  // TODO: add placeholders instead of spin loading status

  // TODO: [???] add "Back" button to input/update forms

  return (
    <>
      <div className="d-flex flex-column ">
        <div className="d-flex flex-wrap justify-content-evenly">
          <Gains />
          <Accounts />
          <Spending />
        </div>
        <div className="container-fluid mb-2">
          <Analytics />
        </div>
      </div>
    </>
  );
};

export default MainPage;
