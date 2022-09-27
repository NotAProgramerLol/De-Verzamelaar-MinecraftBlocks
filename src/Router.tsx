import React, { useState } from "react";
import App from "./pages/App";
import Error from "./pages/Error";
import Producten from "./pages/Producten";
function Router() {
  const [page, setPage] = useState(
    sessionStorage.getItem("currentPage") || "index"
  );
  document.addEventListener("navigate", ((e: CustomEvent) => {
    sessionStorage.setItem("currentPage", e.detail.page);
    setPage(e.detail.page);
  }) as EventListener);
  //pages
  switch (page) {
    case "index":
      return <App />;
    case "Producten":
      return <Producten />;
    default:
      return <Error />;
  }
}

export default Router;
