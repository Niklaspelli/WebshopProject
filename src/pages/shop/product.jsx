import  { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

 export const Product = (props) => {
    const {id, productName, price, productDescription} = props.data;
    const { addToCart, cartItems } = useContext(ShopContext);

    const cartItemCount = cartItems[id];


  return (
    <div className="product">
  <h2>{productName}</h2>
  <div className="description">
  <p>{productDescription}</p>
  <p>Price: {price} $</p>
 </div>
 <button className="addToCartBttn" onClick={() => addToCart(id)}> 
 Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}

 </button> 
</div>
 
  )
}


/*  <Button onClick={() => addToCart(item)}>Add to Cart</Button> */