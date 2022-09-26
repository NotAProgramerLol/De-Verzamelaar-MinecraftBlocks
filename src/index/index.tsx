import "./index.css";

import { render } from "react-dom";
function App() {
  return (
    <div>
      <header>
        <p className="underline">you are on page 2 :(</p>
        <a href="./producten.html">Test producten example</a>
        <a href="./register.html">Test register</a>

        <img src="./assets/logo.svg" alt="" />
      </header>
    </div>
  );
}
render(App(), document.getElementById("root"));
