import React from "react";
import { Routes, Navigate, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from "./layouts/history";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navbar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          exact
          element={<Main />}
        />
        <Route
          path="/login/:type?"
          element={<Login />}
        />
        <Route
          path="/history"
          element={<History />}
        />
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
