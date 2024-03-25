import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from './cart-item';
import { useNavigate } from "react-router-dom";
import "./cart.css";


export const Cart = () => {
  const [products, setProducts] = useState([]);
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();


  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all products from the server (you may adjust the endpoint)
    fetch('http://localhost:3500/PRODUCTS')
      .then(res => res.json())
      .then(products => {
        setProducts(products);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div className="cart">
      <div>
        <h1>Your cart items</h1>
      </div>
      <div className="cartItems">
        {products.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
         
        })}
      </div>
      
{totalAmount > 0 ? (
<div className="checkout">
  <p> Subtotal: $ {totalAmount}</p>
  <button onClick={() => navigate("/")}> Continue Shopping</button>
  <button> Checkout</button>
</div>
) : (<div className="checkout">
  <h1 className="emptyCart">Your cart is empty!</h1>
  
  <button onClick={() => navigate("/")}> Continue Shopping</button>
  </div>
)}
    </div>
  );
}



/* 

export const Cart = () => {
  // eslint-disable-next-line no-undef
  const { cartItems } = useContext(ShopContext);
  return (
    <div className="cart">
      <div>
        <h1>Your cart items</h1>
      </div>
      <div className="cartItems">
{products.map((product) => {
  if (cartItems[product.id] !== 0) {
    return <CartItem data={product} />;
  }
})}

      </div>
    </div>
  )
}

 */