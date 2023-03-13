import React from "react";
import { Outlet } from "react-router-dom";
import CommonFormWrap from "../components/ui/commonFormWrap";

const AddOrEditLayout = () => {
  return (
    <CommonFormWrap>
      <Outlet />
    </CommonFormWrap>
  );
};

export default AddOrEditLayout;
