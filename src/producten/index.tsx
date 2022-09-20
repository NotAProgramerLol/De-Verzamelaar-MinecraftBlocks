import "./index.css";
import { render } from "react-dom";
import { Producten } from "../../components/producten/producten";
type test = {
  name: string;
  image: string;
  id: number;
};
function App() {
  let test: test[] = [
    {
      name: "test",
      image:
        "https://images.ctfassets.net/hrltx12pl8hq/3AnnkVqrlhrqb9hjlMBzKX/693a8e5d40b4b6c55a7673ca4c807eef/Girl-Stock?fit=fill&w=480&h=270",
      id: 1,
    },
    {
      name: "test2",
      image:
        "https://images.ctfassets.net/hrltx12pl8hq/3AnnkVqrlhrqb9hjlMBzKX/693a8e5d40b4b6c55a7673ca4c807eef/Girl-Stock?fit=fill&w=480&h=270",
      id: 2,
    },
    {
      name: "tes3",
      image:
        "https://images.ctfassets.net/hrltx12pl8hq/3AnnkVqrlhrqb9hjlMBzKX/693a8e5d40b4b6c55a7673ca4c807eef/Girl-Stock?fit=fill&w=480&h=270",
      id: 3,
    },
  ];
  return (
    <div>
      <header>
        <a href="/index">Back</a>
      </header>
      {test.map((info) => {
        return <Producten name={info.name} image={info.image} id={info.id} />;
      })}
    </div>
  );
}
render(App(), document.getElementById("root"));
