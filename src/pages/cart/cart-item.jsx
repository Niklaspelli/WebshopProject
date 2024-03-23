import React, { useContext } from 'react';
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
  const { id, productName, price, productDescription } = props.data;
  const { cartItems } = useContext(ShopContext);
  const quantity = cartItems[id] || 0; // Default to 0 if the product is not in the cart

  return (
    <div className='cartItem'> 
      <b>{productName}</b>
      <div className='description'> 
        <p>{productDescription}</p>
        <p>Quantity: {quantity}</p> {/* Display the quantity */}
        <p>Price: $ {price}</p>
      </div>
    </div>
  );
};


