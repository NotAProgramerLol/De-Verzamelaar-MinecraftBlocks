import local_css from "./css/Producten.css?inline";
import Product from "../../components/producten/Product";
import { useQuery } from "@tanstack/react-query";
type response = {
  response: string;
  data: products[];
};
type products = {
  Name: string;
  Image: string;
  Price: number;
  ID: number;
};
function App() {
  const { isLoading, error, data } = useQuery(
    ["getProducts"],
    async (): Promise<response | any> => {
      let resp = await fetch(
        "https://87609.stu.sd-lab.nl/beroeps/verzamelaar/api/public/getProducts.php?onlyAvailable=true",
        { mode: "no-cors" }
      );
      resp = (await resp.json()) as response | any;
      return resp;
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error has occurred!</p>;
  return (
    <div className="bg-white">
      <style>{local_css}</style>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Alle producten
        </h2>

        <div className="mt-2 grid grid-cols-1 gap-y-0 gap-x-6 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-10">
          {data.data.map((product: products) => (
            <Product
              name={product.Name}
              id={product.ID}
              image={product.Image}
              price={product.Price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
