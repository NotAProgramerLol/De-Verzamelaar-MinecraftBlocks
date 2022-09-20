import "./index.css";
import { render } from "react-dom";

type test = {
  name: string;
  image: string;
  id: number;
};
function App() {
  const params = new URLSearchParams(window.location.search);
  return (
    <div>
      <header>
        <a href="/index">Back</a>
      </header>
      <h1>{params.get("ID")}</h1>
    </div>
  );
}
render(App(), document.getElementById("root"));
