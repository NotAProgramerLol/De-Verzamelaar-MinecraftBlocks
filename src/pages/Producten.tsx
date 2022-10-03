import "./css/Producten.css";
import Product from "../../components/producten/Product";

function App() {
  const products = [
    {
      id: 1,
      name: "Dirtblock",
      description: "",
      price: 100,
      availibility: "",
      imageSrc:
        "https://crafty.graphics/wp-content/uploads/2020/12/Minecraft-Dirt-Block.jpg",
      href: "",
    },
    {
      id: 1,
      name: "Dirtblock",
      description: "TEST OMGF",
      price: 100,
      availibility: "",
      imageSrc:
        "https://crafty.graphics/wp-content/uploads/2020/12/Minecraft-Dirt-Block.jpg",
      href: "",
    },
    {
      id: 1,
      name: "Dirtblock",
      description: "",
      price: 100,
      availibility: "",
      imageSrc:
        "https://crafty.graphics/wp-content/uploads/2020/12/Minecraft-Dirt-Block.jpg",
      href: "",
    },
    {
      id: 1,
      name: "Dirtblock",
      description: "",
      price: 100,
      availibility: "",
      imageSrc:
        "https://crafty.graphics/wp-content/uploads/2020/12/Minecraft-Dirt-Block.jpg",
      href: "",
    },
  ];
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Alle producten
        </h2>

        <div className="mt-2 grid grid-cols-1 gap-y-0 gap-x-6 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-10">
          {products.map((product) => (
            <Product
              name={product.name}
              id={product.id}
              image={product.imageSrc}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
