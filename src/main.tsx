import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router";
import Navbar from "../components/general/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Navbar></Navbar>
      <Router></Router>
    </QueryClientProvider>
  </React.StrictMode>
);
