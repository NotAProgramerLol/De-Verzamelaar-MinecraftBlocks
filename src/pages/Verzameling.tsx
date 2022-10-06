import Link from "../../components/general/Link";
import local_css from "./css/Verzameling.css?inline";

function App() {
  return (
    <div className="App">
      <style>{local_css}</style>
      <div className="header">
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">
                Zoek een collectie met een searchable ID
              </span>
            </label>
            <input
              type="text"
              placeholder="searchable ID hier"
              maxLength={45}
              className="input input-bordered input-sm w-full max-w-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
