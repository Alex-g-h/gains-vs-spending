import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { loadAccounts } from "../store/account";
import { loadPayments } from "../store/payment";
import { getIsLoggedIn } from "../store/user";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadAccounts());
      dispatch(loadPayments());
    }
  }, [isLoggedIn]);

  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppLoader;
