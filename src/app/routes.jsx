import React from "react";
import { Navigate } from "react-router-dom";
import MainPage from "./components/page/mainPage";
import ProfilePage from "./components/page/profilePage";
import History from "./layouts/history";
import Login from "./layouts/login";
import LogOut from "./layouts/logout";

const routes = (isLoggedIn, location) => [
  {
    path: "/",
    element: isLoggedIn ? (
      <MainPage />
    ) : (
      <Navigate
        to="/login"
        state={{ referrer: location }}
      />
    ),
  },
  {
    path: "/login/:type?",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <LogOut />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/history",
    element: isLoggedIn ? (
      <History />
    ) : (
      <Navigate
        to="/login"
        state={{ referrer: location }}
      />
    ),
  },
  {
    path: "*",
    element: (
      <Navigate
        to="/"
        replace
      />
    ),
  },
];

export default routes;
