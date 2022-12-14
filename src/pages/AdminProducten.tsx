import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import local_css from "./css/AdminProducten.scss?inline";
import Form from "../../components/admin/form";
type response = {
  response: string;
  data: products[];
};
type products = {
  Name: string;
  Image: string;
  Price: number;
  ID: number;
  Availability: number;
  Description: string;
};
function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newAv, setNewAv] = useState("");
  const [Error, setError] = useState("");
  const { isLoading, error, data } = useQuery(
    ["getProducts"],
    async (): Promise<response | any> => {
      const { data: resp } = await axios.get(
        "https://87609.stu.sd-lab.nl/beroeps/verzamelaar/api/public/getProducts.php"
      );
      return resp;
    }
  );
  console.log(data);
  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error has occurred!</p>;
  return (
    <div className="bg-white">
      <style>{local_css}</style>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="w-96">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Nieuw product
          </h1>
          <div className="newProduct">
            <form
              onSubmit={async (event: any) => {
                event.preventDefault();
                const formData = new FormData();
                if (selectedFile != "") {
                  formData.append("img", selectedFile || "");
                }
                formData.append("name", newName);
                formData.append("description", newDescription);
                formData.append("price", newPrice);
                formData.append("availability", newAv);
                try {
                  const response = await axios({
                    method: "post",
                    url: "https://87609.stu.sd-lab.nl/beroeps/verzamelaar/api/private/addProduct.php",
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                  });
                  if (response.data.response != "Failed") {
                    location.reload();
                    return;
                  }
                  setError(response.data.data.message);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <p>
                <label>Naam: </label>
                <input
                  type="text"
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                />
              </p>
              <p>
                <label>Description: </label>
                <br />
                <textarea
                  onChange={(event) => {
                    setNewDescription(event.target.value);
                  }}
                ></textarea>
              </p>
              <p>
                <label>Prijs: </label>

                <input
                  type="number"
                  onChange={(event) => {
                    setNewPrice(event.target.value);
                  }}
                />
              </p>
              <p>
                <label>Beschikbaarheid: </label>

                <input
                  type="number"
                  onChange={(event) => {
                    setNewAv(event.target.value);
                  }}
                />
              </p>
              <p>
                <label>Afbeelding: </label>
                <br />
                <input type="file" onChange={handleFileSelect} />
              </p>
              <p>
                <input
                  type="submit"
                  className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                  value="Nieuw product"
                />
              </p>
            </form>
            <p>{Error}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Alle producten
        </h2>

        <div className="producten">
          {data.data.map((product: products) => (
            <Form {...product}></Form>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
