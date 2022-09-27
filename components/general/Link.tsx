import React from "react";
type props = {
  href: string;
  children?: React.ReactNode;
};
function Link(data: props) {
  return (
    <a
      onClick={() => {
        let evt = new CustomEvent("navigate", { detail: { page: data.href } });
        document.dispatchEvent(evt);
      }}
    >
      {data.children}
    </a>
  );
}

export default Link;
