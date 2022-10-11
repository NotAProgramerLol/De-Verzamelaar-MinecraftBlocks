import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Link from "../../components/general/Link";
import local_css from "./css/Cart.scss?inline";

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
        let evt = new CustomEvent("navigate", {
          detail: { page: "Verzameling" },
        });
        document.dispatchEvent(evt);
      },
    }
  );
  if (error != "") return <h1>{error}</h1>;
  return (

    <div className="App">
      <style>{local_css}</style>
      <div className="parent">

    <div className="Links">
    <p className="Tekstboven2">Winkelwagentje</p>
    <div className="Producten">
      <div className="product">
        <div className="exit">
          <p>X</p>
        </div>
        <div className="img">
          <img src="https://support.undsgn.com/hc/article_attachments/360009979057/doc-cc-intro-min.jpg" alt="" />
        </div>
        <div className="name">
          <h1>IK KAAS</h1>
        </div>
        <div className="price">
          <h1>€ 2.2</h1>
        </div>
      </div>
      <div className="product">
        <div className="exit">
          <p>X</p>
        </div>
        <div className="img">
          <img src="https://support.undsgn.com/hc/article_attachments/360009979057/doc-cc-intro-min.jpg" alt="" />
        </div>
        <div className="name">
          <h1>IK KAAS</h1>
        </div>
        <div className="price">
          <h1>€ 2.2</h1>
        </div>
      </div>
      <div className="product">
        <div className="exit">
          <p>X</p>
        </div>
        <div className="img">
          <img src="https://support.undsgn.com/hc/article_attachments/360009979057/doc-cc-intro-min.jpg" alt="" />
        </div>
        <div className="name">
          <h1>IK KAAS</h1>
        </div>
        <div className="price">
          <h1>€ 2.2</h1>
        </div>
      </div>

      <div className="product">
        <div className="exit">
          <p>X</p>
        </div>
        <div className="img">
          <img src="https://support.undsgn.com/hc/article_attachments/360009979057/doc-cc-intro-min.jpg" alt="" />
        </div>
        <div className="name">
          <h1>IK KAAS</h1>
        </div>
        <div className="price">
          <h1>€ 2.2</h1>
        </div>
      </div>
      
      
    </div>

    </div>


    <div className="Rechts">

      <p className="Tekstboven">Winkelwagentje</p>
      <div className="Berekeningen">
        <p className="tekstmidden">Tekst</p>
      </div>
      <div className="Berekeningen">
        <p className="tekstmidden">Tekst</p>
      </div>

        <button className="kassa"
            onClick={() => {
              mutate();
              sessionStorage.removeItem("Cart");
            }}
          >
            Door naar de kassa
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
