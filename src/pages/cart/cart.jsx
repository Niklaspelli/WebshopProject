import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from './cart-item';
import { useNavigate } from "react-router-dom";
import "./cart.css";

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all products from the server (you may adjust the endpoint)
    fetch('http://localhost:3500/PRODUCTS')
      .then(res => res.json())
      .then(products => {
        // Filter products to only include those in the cart
        const productsInCart = products.filter(product => cartItems[product.id] > 0);
        setCartProducts(productsInCart);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [cartItems]);

  return (
    <div className="cart">
      <div>
        <h1>Din Varukorg:</h1>
      </div>
      <div className="cartItems">
        {cartProducts.map(product => (
          <CartItem data={product} key={product.id}/>
        ))}
      </div>
      
      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Summa:  {totalAmount}:-</p>
          <button onClick={() => navigate("/")}> Fortsätt Handla</button>
          <button> Kassa</button>
        </div>
      ) : (
        <div className="checkout">
          <h1 className="emptyCart">Din varukorg är tom!</h1>
          <button onClick={() => navigate("/")}> Fortsätt Handla</button>
        </div>
      )}
    </div>
  );
}