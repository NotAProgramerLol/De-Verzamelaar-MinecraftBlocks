import React from "react";

type Props = {
  name: string;
  image: string;
  id: number;
};

export const Producten = (props: Props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <img src={props.image} alt={props.name + " image"} />
      <a href={"/product?ID=" + props.id}>Read more</a>
    </div>
  );
};
