import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from './cart-item';
import { useNavigate } from "react-router-dom";
import "./cart.css";

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false); // New state variable for order placement
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
        setOrderPlaced(true); // Set orderPlaced to true after successful order placement
        setCartProducts([]); // Empty the cart after successful order placement
      } else {
        console.error('Failed to place order:', response.statusText);
        // Handle failed order placement
      }
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error while placing the order
    }
  };

  useEffect(() => {
    // Fetch all products from the server (you may adjust the endpoint)
    fetch('http://localhost:3000/PRODUCTS')
      .then(res => res.json())
      .then(products => {
        // Filter products to only include those in the cart
        const productsInCart = products.PRODUCTS.filter(product => cartItems[product.id] > 0);
        console.log('Products in cart:', productsInCart); // Add this line
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
      
      {orderPlaced ? (
        <div className="checkout">
          <h2>Tack för din beställning! Skickas inom 3-5 arbetsdagar!</h2>
          <button onClick={() => navigate("/")}>Fortsätt Handla</button>
        </div>
      ) : (
        <div className="checkout">
          {totalAmount > 0 ? (
            <>
              <p className="subtotal">Summa: {totalAmount}:-</p>
              <button onClick={() => navigate("/")}>Fortsätt Handla</button>
              <button onClick={sendOrderToAPI}>Kassa</button>
            </>
          ) : (
            <>
              <h1 className="emptyCart">Din varukorg är tom!</h1>
              <button onClick={() => navigate("/")}>Fortsätt Handla</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};