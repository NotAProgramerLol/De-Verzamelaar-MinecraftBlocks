import "./index.css";

import { render } from "react-dom";
function App() {
  return (
    <div>
      <header>
        <p className="underline">you are on page 2 :(</p>
        <a href="/pagetwenty">go to page 20 !</a>
      </header>
    </div>
  );
}
render(App(), document.getElementById("root"));
