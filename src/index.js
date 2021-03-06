import React from "react";
import ReactDOM from "react-dom";

//import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Parse from "parse/dist/parse.min.js";
import * as ParseConfig from "./config/ParseConfig";

import Autheticator from "./shared/helper/Authenticator";

import Home from "./shared/pages/Home";
import Login from "./shared/pages/Login";
import Register from "./shared/pages/Register";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import '@popperjs/core'
import "bootstrap/dist/js/bootstrap.bundle";

Parse.initialize(
  ParseConfig.PARSE_APPLICATION_ID,
  ParseConfig.PARSE_JAVASCRIPT_KEY
);
Parse.serverURL = ParseConfig.PARSE_HOST_URL;

const AnimatedRouter = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="page" timeout={0}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="" element={<Login />} />
          <Route
            path="inicio"
            element={
              <Autheticator>
                <Home />
              </Autheticator>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <AnimatedRouter />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
