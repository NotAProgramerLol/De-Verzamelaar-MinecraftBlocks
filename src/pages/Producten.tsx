import React, { useState, Dispatch, SetStateAction } from "react";

import "./css/Producten.css";
interface props {
  setPage: Dispatch<SetStateAction<string>>;
}
function App(props: props) {

  const products = [
    {
      id: 1,
      name: 'Dirtblock',
      description: '',
      price: '$100',
      availibility: '',
      imageSrc: 'https://crafty.graphics/wp-content/uploads/2020/12/Minecraft-Dirt-Block.jpg',
      href: '',
    },
    {
      id: 1,
      name: 'Dirtblock',
      description: '',
      price: '$100',
      availibility: '',
      imageSrc: 'https://crafty.graphics/wp-content/uploads/2020/12/Minecraft-Dirt-Block.jpg',
      href: '',
    },
    {
      id: 1,
      name: 'Dirtblock',
      description: '',
      price: '$100',
      availibility: '',
      imageSrc: 'https://crafty.graphics/wp-content/uploads/2020/12/Minecraft-Dirt-Block.jpg',
      href: '',
    },
    {
      id: 1,
      name: 'Dirtblock',
      description: '',
      price: '$100',
      availibility: '',
      imageSrc: 'https://crafty.graphics/wp-content/uploads/2020/12/Minecraft-Dirt-Block.jpg',
      href: '',
    },
    
  ]
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Alle producten</h2>


        <div className="mt-2 grid grid-cols-1 gap-y-0 gap-x-6 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-10">
          {products.map((product) => (
            
            <div className="bg-gray-400 h-100 w-full p-3 my-1" >
              
              <p className="text-sm font-large text-black-100 float-right my-4">{product.price}</p>
                  <h2 className="text-sm font-large text-gray-400 float-left">
                    <div>
                    </div>
                    <a href={product.href}>
                      {product.name}
                    </a>
                  </h2>
            <div key={product.id} className="group relative">
              <div className="min-h-10 aspect-w-10 aspect-h-10 w-full overflow-hidden bg-gray-300 lg:aspect-none lg:h-70">
                <img
                  src={product.imageSrc}
                  className="object-cover object-center lg:h-100 lg:w-100"
                />
              </div>
              <div className="mt- flex justify-between">

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
