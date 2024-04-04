import { useContext } from "react";
import { ShopContext } from "../../context/Shop-Context";
import { Link } from 'react-router-dom';
import './Shop.css';



export const Product = ({ data }) => {
  const { id, productName, price,  productImage } = data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];

  return (
    
    <div className="card">
     
      <h2>{productName}</h2> 
      <Link to={`/productDetails/${id}`}>
      <img src={productImage} className="itemImage" />
      </Link>
        <p>Pris: {price}:-</p>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Lägg till varukorg {cartItemCount > 0 && <> ({cartItemCount}) </>  
        }
      </button>
    </div>
  );
};