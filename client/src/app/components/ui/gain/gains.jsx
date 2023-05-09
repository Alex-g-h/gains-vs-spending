import React from "react";
import GainsList from "./gainsList";
import CardWithHeader from "../hoc/cardWithHeader";

const Gains = () => {
  return (
    <CardWithHeader
      headerAddLink={"/gain/add"}
      headerCaption={"Gains"}
    >
      <GainsList />
    </CardWithHeader>
  );
};

export default Gains;
