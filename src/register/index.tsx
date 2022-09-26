import "./index.css";
import { render } from "react-dom";
import {
  useQuery,
  useQueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
interface register {
  email: string;
  password: string;
  confirmPassword: string;
}
export const register = async (data: register) => {
  const res = await fetch("@/api/auth/register.php", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
};
function App() {
  const queryClient = useQueryClient();
  let inputs: register = {
    email: "test@test.nl",
    password: "k",
    confirmPassword: "vla",
  };
  const { data, status } = useQuery(["Register"], () => register(inputs));

  return (
    <QueryClientProvider client={queryClient}>
      <header>
        <a href="/index">Back</a>
      </header>
      {status == "error" && <p>Something went wrong</p>}
      {status == "success" && <p>{JSON.stringify(data)}</p>}
    </QueryClientProvider>
  );
}
render(App(), document.getElementById("root"));
