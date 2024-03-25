import React, { useContext } from 'react';
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);
  const quantity = cartItems[id] || 0; // Default to 0 if the product is not in the cart

  return (
    <div className='card'> 
    
      <b>{productName}</b>
      <img src={productImage} className='itemImage'/>
      <div className='description'> 
      
        <p>Quantity:</p> <b className='quantity'>{quantity}</b> {/* Display the quantity */}
        <p>Price: $ {price}</p>
        <div className='countHandler'>
          <button onClick={() => removeFromCart(id)}> - </button>
          <input value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value), id)}/>
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};
