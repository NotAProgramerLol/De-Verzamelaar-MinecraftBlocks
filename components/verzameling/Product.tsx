import Link from "../general/Link";
import styles from "./Product.module.scss";
type Props = {
  name: string;
  image: string;
  price: number;
  id: number;
  availability: number;
};

const Product = (product: Props) => {
  return (
    <div className={styles.product}>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img src={product.image} alt={product.name + " image"} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>Prijs: € {product.price}</p>
          <p>Beschikbaarheid: {product.availability}</p>
          <Link href="ProductInfo" pageProp={{ ID: product.id }}>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Meer informatie</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Product;
