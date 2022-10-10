import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Link from "../../components/general/Link";
import local_css from "./css/Cart.css?inline";

type response = {
  response: string;
  data: {
    message: string;
  };
};
function App() {
  const [error, setError] = useState("");
  const cart = JSON.parse(sessionStorage.getItem("Cart") || "[]");
  const { mutate } = useMutation(
    async (): Promise<response | any> => {
      try {
        const { data: response } = await axios.postForm(
          "https://87609.stu.sd-lab.nl/beroeps/verzamelaar/api/private/addToCollection.php",
          { Items: cart }
        );

        return response;
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: (data) => {
        if (data.response == "Failed") {
          setError(data.data.message);
          return;
        }
      },
    }
  );
  if (error != "") return <h1>{error}</h1>;
  return (
    <div className="App">
      <style>{local_css}</style>
      <button
        onClick={() => {
          mutate();
        }}
      >
        Betaal
      </button>
    </div>
  );
}

export default App;
