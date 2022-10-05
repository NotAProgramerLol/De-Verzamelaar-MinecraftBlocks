import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "./css/Inloggen.css";
import axios from "axios";

type response = {
  response: string;
  data: {
    message: string;
  };
};

function App() {
  const { mutate, isLoading } = useMutation(
    async (): Promise<response | any> => {
      try {
        const { data: response } = await axios.postForm(
          "https://87609.stu.sd-lab.nl/beroeps/verzamelaar/api/auth/login.php",
          { email, password }
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
          Login
        </button>
      </div>
    </div>
  );
}

export default App;
