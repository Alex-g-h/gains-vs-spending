import React from "react";
import AccountsList from "./accountsList";
import CardWithHeader from "../hoc/cardWithHeader";

const Accounts = () => {
  return (
    <CardWithHeader
      headerAddLink={"/account/add"}
      headerCaption={"Accounts"}
      divMargin={"mx-0"}
    >
      <AccountsList />
    </CardWithHeader>
  );
};

export default Accounts;
