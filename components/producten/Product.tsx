import React from "react";
import Link from "../general/Link";
type Props = {
  name: string;
  image: string;
  price: number;
  id: number;
};

const Product = (product: Props) => {
  return (
    <div className="bg-gray-400 h-100 w-full p-3 my-1">
      <p className="text-sm font-large text-black float-right my-4">
        € {product.price}
      </p>
      <h2 className="text-sm font-large text-gray-400 float-left">
        <div></div>
        <Link href="ProductInfo">{product.name}</Link>
      </h2>
      <div key={product.id} className="group relative">
        <div className="min-h-10 aspect-w-10 aspect-h-10 w-full overflow-hidden bg-gray-300 lg:aspect-none lg:h-70">
          <div className="flex">
            <img
              src={product.image}
              className="object-cover object-center lg:h-100 lg:w-100"
            />
            <Link href="ProductInfo" pageProp={{ ID: product.id }}>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Meer informatie</button>
              </div>
            </Link>
          </div>
        </div>
        <div className="mt-flex justify-between"></div>
      </div>
    </div>
  );
};
export default Product;
