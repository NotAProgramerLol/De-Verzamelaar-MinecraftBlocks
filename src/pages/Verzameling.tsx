import Link from "../../components/general/Link";
import local_css from "./css/Verzameling.scss?inline";
import Product from "../../components/verzameling/Product";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
type response = {};
function App() {
  const [ID, setID] = useState(
    sessionStorage.getItem("SearchableID") as string | ""
  );
  if (ID == null) {
    setID("");
  }
  const { isLoading, error, data } = useQuery(
    ["getProducts"],
    async (): Promise<response | any> => {
      let resp = await fetch(
        "https://87609.stu.sd-lab.nl/beroeps/verzamelaar/api/public/getProducts.php"
      );
      resp = (await resp.json()) as response | any;
      return resp;
    }
  );
  return (
    <div className="App">
      <style>{local_css}</style>
      <div className="header">
        <div className="searchUser">
          <div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">
                  Zoek een collectie met een searchable ID
                </span>
              </label>
              <input
                type="text"
                value={ID}
                placeholder="searchable ID hier"
                maxLength={45}
                className="input input-bordered input-sm w-full max-w-full"
                onBlur={(event) => {
                  setID(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="userInfo">
          <div>
            <div>
              <input
                type="text"
                placeholder="searchable ID hier"
                maxLength={45}
                disabled
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>
            <div>
              <h3>Role</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="producten">
        <Product
          name="test"
          price={12.2}
          availability={5}
          id={2}
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
        ></Product>
        <Product
          name="test"
          price={12.2}
          availability={5}
          id={2}
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
        ></Product>
      </div>
    </div>
  );
}

export default App;
