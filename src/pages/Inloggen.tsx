import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import local_css from "./css/Inloggen.css?inline";
import axios from "axios";
import Link from "../../components/general/Link";
type response = {
  response: string;
  data: {
    message: string;
  };
};

function App() {
  const { mutate } = useMutation(
    async (): Promise<response | any> => {
      try {
        const { data: response } = await axios.postForm(
          "https://87609.stu.sd-lab.nl/beroeps/verzamelaar/api/auth/login.php",
          { email, password }
        );
        if (response.role == "Beheerder") {
          sessionStorage.setItem("role", response.role);
          location.reload();
        }
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
      onError: () => {
        setError("Er is iets fout gegaan probeer het later opnieuw!");
      },
    }
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="App">
      <style>{local_css}</style>
      <div className="panel">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email adress</span>
            <span className="label-text-alt"></span>
          </label>
          <input
            type="email"
            placeholder="Type here"
            id={email}
            onChange={(event) => setEmail(event.target.value)}
            className="input input-sm input-bordered input-primary w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text-alt"></span>
            <span className="label-text-alt"></span>
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password</span>
            <span className="label-text-alt"></span>
          </label>
          <input
            type="password"
            id={password}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
            title="Het password moet 8 tot 18 karakters hebben en, minimaal ????n hoofdletter, ????n kleine letter, ????n cijfer en ????n speciaal teken!"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Type here"
            className="input input-sm input-bordered input-primary w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text-alt"></span>
            <span className="label-text-alt text-red-600 font-bold">
              {error}
            </span>
          </label>
        </div>
        <div className="formButtons">
          <div>
            <button
              className="btn btn-primary"
              onClick={() => {
                try {
                  mutate();
                } catch (error) {
                  setError("Er is iets fout gegaan probeer het later opnieuw!");
                }
              }}
            >
              Login
            </button>
          </div>

          <div>
            <Link href="Register">
              <p>Registreer</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
