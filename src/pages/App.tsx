import local_css from "./css/App.css?inline";

function App() {
  return (
    <div className="App w.screen h.screen grid grid-cols-3 grid-rows-2 from-green-700 via-white to-white bg-gradient-to-b text-black">
      <style>{local_css}</style>
      <div className="row-start-1 col-start-1">
        <p>
          hallo en welkom bij deze soteer site hier kan je je bloken colectie
          vergroten{" "}
        </p>
      </div>
      <div className="row-start-2 col-start-1">
        <br />
        <p>
          wij moesten deze site maken voor beroeps, en we hebben (geforceerd)
          deze opdracht gekozen.
        </p>
      </div>
      <div className="col-span-2 row-span-2 row-start-1 col-start-2 w-100">
        <img className="w-full h-100 " src="./mcBlock.gif" alt="" />
      </div>
    </div>
  );
}

export default App;
