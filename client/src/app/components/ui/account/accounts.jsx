import React from "react";
import AccountsList from "./accountsList";
import CardWithHeader from "../hoc/cardWithHeader";
import AccountsImage from "../../../../images/accounts.svg";

const Accounts = () => {
  return (
    <CardWithHeader
      headerAddLink={"/account/add"}
      headerCaption={"Accounts"}
      headerImage={AccountsImage}
      divMargin={"mx-0"}
    >
      <AccountsList />
    </CardWithHeader>
  );
};

export default Accounts;
