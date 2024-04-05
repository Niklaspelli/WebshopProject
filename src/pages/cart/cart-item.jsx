import { useContext } from 'react';
import { ShopContext } from "../../context/Shop-Context";

export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);
  const quantity = cartItems[id] || 0; // Nollställ om produkten inte är i kundkorgen

  return (
    <div className='card'> 
    
      <b>{productName}</b>
      <img src={productImage} className='itemImage'/>
      <div className='description'> 
      
        <p>Antal:</p> <b className='quantity'>{quantity}</b> 
        <p>Pris:  {price} :-</p>
        <div className='countHandler'>
          <button onClick={() => removeFromCart(id)}> - </button>
          <input value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value), id)}/>
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};
