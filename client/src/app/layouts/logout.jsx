import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthErrors, logOut } from "../store/user";
import { toast } from "react-toastify";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutError = useSelector(getAuthErrors());

  useEffect(() => {
    dispatch(logOut());
    navigate("/");
  }, []);

  useEffect(() => {
    if (logoutError) toast.error(logoutError);
  }, [logoutError]);

  return <h3>Loading ...</h3>;
};

export default LogOut;
