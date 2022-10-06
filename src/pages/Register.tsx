import local_css from "./css/Register.css?inline";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
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
          "https://87609.stu.sd-lab.nl/beroeps/verzamelaar/api/auth/register.php",
          { email, password, confirmPassword }
        );

        return response;
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: (data) => {
        console.log(data);
        if (data.response == "Failed") {
          setError(data.data.message);
          return;
        }
        let evt = new CustomEvent("navigate", {
          detail: { page: "Inloggen" },
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
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  return (
    <div className="Register">
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
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Type here"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
            title="Het password moet 8 tot 18 karakters hebben en, minimaal één hoofdletter, één kleine letter, één cijfer en één speciaal teken!"
            className="input input-sm input-bordered input-primary w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text-alt"></span>
            <span className="label-text-alt text-red-600 font-bold"></span>
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Confirm password</span>
            <span className="label-text-alt"></span>
          </label>
          <input
            type="password"
            id={password}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Type here"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
            title="Het password moet 8 tot 18 karakters hebben en, minimaal één hoofdletter, één kleine letter, één cijfer en één speciaal teken!"
            className="input input-sm input-bordered input-primary w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text-alt"></span>
            <span className="label-text-alt text-red-600 font-bold">
              {error}
            </span>
          </label>
        </div>
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
          Registreer
        </button>
      </div>
    </div>
  );
}

export default App;
