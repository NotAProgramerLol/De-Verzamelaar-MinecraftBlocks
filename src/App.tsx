import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.scss";

const fetchSomething = async () => {
  const res = await fetch("./THISDOESNOTEXIST.json");
  return res.json();
};

function App() {
  const [count, setCount] = useState(0);
  const queryClient = useQueryClient();
  const { data, status } = useQuery(["THISDOESNOTEXIST"], fetchSomething);
  return (
    <div className="App">
      {status === "error" && <p>OMG THE FETCH FAILED</p>}
      {status === "loading" && <p>TRYING TO GET DATA THAT DOES NOT EXIST</p>}

      <button>test</button>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="underline text-red-600">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
