import React, { useState } from "react";
import App from "./pages/App";
import Error from "./pages/Error";
import Producten from "./pages/Producten";
import AdminBestellingen from "./pages/AdminBestellingen";
import AdminProducten from "./pages/AdminProducten";
import Betalen from "./pages/Betalen";
import Cart from "./pages/Cart";
import Inloggen from "./pages/Inloggen";
import ProductInfo from "./pages/ProductInfo";
import Register from "./pages/Register";
import Verzameling from "./pages/Verzameling";
function Router() {
  const [page, setPage] = useState(
    sessionStorage.getItem("currentPage") || "Index"
  );
  document.addEventListener("navigate", ((e: CustomEvent) => {
    sessionStorage.setItem("currentPage", e.detail.page);
    setPage(e.detail.page);
  }) as EventListener);
  //pages
  switch (page) {
    case "Index":
      return <App />;
    case "AdminBestellingen":
      return <AdminBestellingen />;
    case "AdminProducten":
      return <AdminProducten />;
    case "Betalen":
      return <Betalen />;
    case "Cart":
      return <Cart />;
    case "Inloggen":
      return <Inloggen />;
    case "ProductInfo":
      return <ProductInfo />;
    case "Register":
      return <Register />;
    case "Verzameling":
      return <Verzameling />;
    case "Producten":
      return <Producten />;
    default:
      return <Error />;
  }
}

export default Router;
