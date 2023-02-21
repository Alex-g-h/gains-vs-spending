import React from "react";
import { Navigate } from "react-router-dom";
import MainPage from "./components/page/mainPage";
import ProfilePage from "./components/page/profilePage";
import AccountForm from "./components/ui/account/accountForm";
import GainForm from "./components/ui/gain/gainForm";
import SpendingForm from "./components/ui/spending/spendingForm";
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
    path: "login/:type?",
    element: <Login />,
  },
  {
    path: "logout",
    element: <LogOut />,
  },
  {
    path: "profile",
    element: <ProfilePage />,
  },
  {
    path: "history",
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
    path: "account",
    children: [
      {
        path: "add",
        element: <AccountForm />,
      },
      {
        path: ":accountId/edit",
        element: <AccountForm />,
      },
    ],
  },
  {
    path: "gain",
    children: [
      {
        path: "add",
        element: <GainForm />,
      },
      {
        path: ":gainId/edit",
        element: <GainForm />,
      },
    ],
  },
  {
    path: "spending",
    children: [
      {
        path: "add",
        element: <SpendingForm />,
      },
      {
        path: ":spendingId/edit",
        element: <SpendingForm />,
      },
    ],
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
