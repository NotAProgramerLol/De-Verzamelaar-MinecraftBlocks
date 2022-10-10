import Link from "../../components/general/Link";
import local_css from "./css/Verzameling.scss?inline";
import Product from "../../components/verzameling/Product";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type collectionResponse = {
  response: string;
  data: number[];
};
type product = {
  ID: number;
  Name: string;
  Description: string;
  Price: number;
  Availability: number;
  Image: string;
};
type collectionProductsResponse = {
  response: string;
  data?: product[];
};
function App() {
  const [ID, setID] = useState(
    sessionStorage.getItem("SearchableID") as string | ""
  );
  const { isLoading, error, data } = useQuery(
    ["getCollection"],
    async (): Promise<collectionProductsResponse | any> => {
      let returnValue: collectionProductsResponse = {
        response: "Failed",
        data: [],
      };
      try {
        let url =
          "https://87609.stu.sd-lab.nl/beroeps/verzamelaar/api/public/getCollection.php?ID=" +
          ID;
        if (ID == null) {
          url =
            "https://87609.stu.sd-lab.nl/beroeps/verzamelaar/api/public/getCollection.php";
        }
        const { data: collectionResponse } = await axios.get(url);

        if (collectionResponse.response == "Failed") {
          returnValue.response = "Failed";
          return returnValue;
        }
        returnValue.response = "Success";
        for (let i = 0; i < collectionResponse.data.length; i++) {
          const { data: product } = await axios.get(
            "https://87609.stu.sd-lab.nl/beroeps/verzamelaar/api/public/getProduct.php?ID=" +
              collectionResponse.data[i]
          );

          if (product.response == "Success") {
            returnValue.data?.push(product.data[0]);
          }
        }
        return returnValue;
      } catch {
        return returnValue;
      }
    }
  );
  if (isLoading) {
    return <h1>LOADING..</h1>;
  }
  console.log(data);
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
        {data.response != "Failed" ? (
          data.data.map((product: product) => {
            return (
              <Product
                name={product.Name}
                price={product.Price}
                availability={product.Availability}
                id={product.ID}
                image={product.Image}
              ></Product>
            );
          })
        ) : (
          <h1>Geen collectie gevonden!</h1>
        )}
      </div>
    </div>
  );
}

export default App;
