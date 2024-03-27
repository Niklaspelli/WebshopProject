import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = ({ data }) => {
  const { id, productName, price, productDescription, productImage } = data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];

  return (
    <div className="card">
      <h2>{productName}</h2>
      <img src={productImage} className="itemImage" />
      <div className="description">
        <p>{productDescription}</p>
        <p>Pris: {price}:-</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Lägg till varukorg {cartItemCount > 0 && <> ({cartItemCount}) </>
        }
      </button>
    </div>
  );
};