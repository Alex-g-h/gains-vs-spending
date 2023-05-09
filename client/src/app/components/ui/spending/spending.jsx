import React from "react";
import SpendingList from "./spendingList";
import CardWithHeader from "../hoc/cardWithHeader";

const Spending = () => {
  return (
    <CardWithHeader
      headerAddLink={"/spending/add"}
      headerCaption={"Spending"}
    >
      <SpendingList />
    </CardWithHeader>
  );
};

export default Spending;
