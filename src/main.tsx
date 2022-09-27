import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router";
import Navbar from "../components/general/Navbar";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Navbar></Navbar>
    <Router></Router>
  </React.StrictMode>
);
