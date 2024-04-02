import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from './cart-item';
import { useNavigate } from "react-router-dom";
import "./cart.css";

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  // Function to calculate the total price amount
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartProducts.forEach(product => {
      totalPrice += product.price * cartItems[product.id];
    });
    return totalPrice;
  };

  // Function to prepare the order data
  const prepareOrderData = () => {
    const orderItems = cartProducts.map(product => ({
      productId: product.id,
      quantity: cartItems[product.id]
    }));
    return {
      items: orderItems,
      totalAmount: calculateTotalPrice()
    };
  };

  // Function to send the order to the API
  const sendOrderToAPI = async () => {
    const orderData = prepareOrderData();
    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      if (response.ok) {
        console.log('Order placed successfully!');
        setOrderPlaced(true);
        setCartProducts([]);
        navigate('/checkout'); // Navigate to the checkout page after successful order placement
      } else {
        console.error('Failed to place order:', response.statusText);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  useEffect(() => {
    fetch('http://localhost:3000/PRODUCTS')
      .then(res => res.json())
      .then(products => {
        const productsInCart = products.PRODUCTS.filter(product => cartItems[product.id] > 0);
        setCartProducts(productsInCart);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [cartItems]);

  return (
    <div>
      <div>
        <h1>Din Varukorg:</h1>
      </div>
      <div className="cartItems">
        {cartProducts.map(product => (
          <CartItem data={product} key={product.id}/>
        ))}
      </div>
      
      {orderPlaced ? (
        <div className="checkout">
          <h2>Tack för din beställning! Skickas inom 3-5 arbetsdagar!</h2>
          <button onClick={() => navigate("/")} className="cart-button">Fortsätt Handla</button>
        </div>
      ) : (
        <div className="checkout">
          {totalAmount > 0 ? (
            <>
              <p className="subtotal">Summa: {totalAmount}:-</p>
              <button onClick={() => navigate("/")} className="cart-button">Fortsätt Handla</button>
              <button onClick={sendOrderToAPI} className="cart-button">Kassa</button>
            </>
          ) : (
            <>
              <h1 className="emptyCart">Din varukorg är tom!</h1>
              <button onClick={() => navigate("/")} className="cart-button">Fortsätt Handla</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};