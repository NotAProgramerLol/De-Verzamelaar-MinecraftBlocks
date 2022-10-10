import React from "react";
type props = {
  href: string;
  pageProp?: any;
  children?: React.ReactNode;
};
function Link(data: props) {
  return (
    <a
      onClick={() => {
        if (data.pageProp != null) {
          sessionStorage.setItem("pageProps", JSON.stringify(data.pageProp));
        }
        let evt = new CustomEvent("navigate", { detail: { page: data.href } });
        document.dispatchEvent(evt);
      }}
    >
      {data.children}
    </a>
  );
}

export default Link;
