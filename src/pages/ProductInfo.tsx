import local_css from "./css/ProductInfo.scss?inline";
import { useQuery } from "@tanstack/react-query";
import Link from "../../components/general/Link";

type response = {
  response: string;
  date: product[];
};
type product = {
  ID: number;
  Name: string;
  Description: string;
  Price: number;
  Availability: number;
  Image: string;
};
function App() {
  const pageProps = sessionStorage.getItem("pageProps") || "{}";
  let productID = JSON.parse(pageProps).ID;
  const { isLoading, error, data } = useQuery(
    ["getProducts"],
    async (): Promise<response | any> => {
      let resp = await fetch(
        "https://87609.stu.sd-lab.nl/beroeps/verzamelaar/api/public/getProduct.php?ID=" +
          productID
      );
      resp = (await resp.json()) as response | any;
      return resp;
    }
  );
  if (error) return <h1>Er ging iets fout!</h1>;
  if (isLoading) return <h1>De gegevens worden geladen!</h1>;
  if (data.response == "Failed")
    return <h1>Dit product kunnen wij niet vinden!</h1>;
  return (
    <div className="App">
      <style>{local_css}</style>
      <div>
        <h1>{data.data[0].name}</h1>
      </div>
      <div className="container">
        <div className="img">
          <img
            src={data.data[0].Image}
            alt={data.data[0].Name + " afbeelding"}
          />
        </div>
        <div className="info">
          <div className="flex">
            <div className="w-1/2">
              <button
                onClick={() => {
                  let cart = JSON.parse(sessionStorage.getItem("Cart") || "[]");
                  cart.push(data.data[0]);
                  sessionStorage.setItem("Cart", JSON.stringify(cart));
                }}
              >
                <Link href="Producten">Toevoegen aan winkelwagen</Link>
              </button>
            </div>
            <div className="w-1/2">
              <div className="float-right">
                <h1>{data.data[0].Price}</h1>
                <h1>{data.data[0].Availability}</h1>
              </div>
            </div>
          </div>
          <div>{data.data[0].Description}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
