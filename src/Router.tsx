import React, { useState } from "react";
import App from "./App";
import Error from "./error";
function Router() {
  const [page, setPage] = useState("index");
  if (page == "index") {
    return <App setPage={setPage} />;
  }
  return <Error setPage={setPage} />;
}

export default Router;
