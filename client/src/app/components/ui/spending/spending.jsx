import React from "react";
import SpendingList from "./spendingList";
import CardWithHeader from "../hoc/cardWithHeader";
import SpendingImage from "../../../../images/spending.svg";

const Spending = () => {
  return (
    <CardWithHeader
      headerAddLink={"/spending/add"}
      headerCaption={"Spending"}
      headerImage={SpendingImage}
    >
      <SpendingList />
    </CardWithHeader>
  );
};

export default Spending;
