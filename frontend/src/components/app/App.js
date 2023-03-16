import "./App.css";
import React, { useContext } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import ModalList from "../modalList/ModalList";
import WithoutNav from "../withoutNav/WithoutNav";
import WithNav from "../withNav/WithNav";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../user/SignUpForm";
import Feed from "../feed/Feed";

import { AuthContext } from "../../contexts/AuthContext";
import Image from "../imageUpload/Image";

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <ModalList />
      <Routes>
        <Route element={<WithNav />}>
          <Route
            path="/"
            element={token ? <Feed /> : <Navigate to="/login" />}
          />
        </Route>

        <Route element={<WithoutNav />}>
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <LoginForm />}
          />
          <Route
            path="/signup"
            element={token ? <Navigate to="/" /> : <SignUpForm />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
