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
type products = {
  Name: string;
  Image: string;
  Price: number;
  ID: number;
};
function App() {
  const [error, setError] = useState("");
  let cart = JSON.parse(sessionStorage.getItem("Cart") || "[]");
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
  console.log(cart);
  let prijs = 0;

  for (let i = 0; i < cart.length; i++) {
    prijs += parseFloat(cart[i].Price);
  }

  if (error != "") return <h1>{error}</h1>;
  return (
    <div className="App">
      <style>{local_css}</style>
      <div className="parent">
        <div className="Links">
          <p className="Tekstboven2">Winkelwagentje</p>
          <div className="Producten">
            {cart.map((products: products, i: number) => {
              return (
                <div className="product">
                  <div className="exit">
                    <button
                      onClick={() => {
                        let index = i.toString();
                        console.log(index);
                        let newcart = JSON.parse(
                          sessionStorage.getItem("Cart") || "[]"
                        );
                        for (let x = 0; x < cart.length; x++) {
                          if (newcart[x].ID == products.ID) {
                            newcart = cart.splice(x, 1);
                            sessionStorage.setItem(
                              "Cart",
                              JSON.stringify(cart)
                            );
                            location.reload();
                          }
                        }
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div className="img">
                    <img src={products.Image} alt="" />
                  </div>
                  <div className="name">
                    <h1>{products.Name}</h1>
                  </div>
                  <div className="price">
                    <h1>€ {products.Price}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="Rechts">
          <p className="Tekstboven">Winkelwagentje</p>

          <div className="Berekeningen">
            <p className="tekstmidden">Totaal prijs: {prijs}</p>
          </div>

          <button
            className="kassa"
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
