import "./index.css";
import logo from "@/assets/logo.svg";
import { render } from "react-dom";
function App() {
  return (
    <div>
      <header>
        <p className="underline">you are on page 2 :(</p>
        <a href="/producten">Test producten example</a>
        <img src={logo} alt="" />
      </header>
    </div>
  );
}
render(App(), document.getElementById("root"));
