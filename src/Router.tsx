import React, { useState } from "react";
import App from "./pages/App";
import Error from "./pages/error";
function Router() {
  const [page, setPage] = useState(
    sessionStorage.getItem("currentPage") || "index"
  );
  document.addEventListener("navigate", ((e: CustomEvent) => {
    sessionStorage.setItem("currentPage", e.detail.page);
    setPage(e.detail.page);
  }) as EventListener);
  if (page == "index") {
    return <App setPage={setPage} />;
  }
  return <Error setPage={setPage} />;
}

export default Router;
