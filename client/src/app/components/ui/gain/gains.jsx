import React from "react";
import GainsList from "./gainsList";
import CardWithHeader from "../hoc/cardWithHeader";
import GainsImage from "../../../../images/gains.svg";

const Gains = () => {
  return (
    <CardWithHeader
      headerAddLink={"/gain/add"}
      headerCaption={"Gains"}
      headerImage={GainsImage}
    >
      <GainsList />
    </CardWithHeader>
  );
};

export default Gains;
