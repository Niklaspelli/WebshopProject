import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/Shop-Context";
import { CartItem } from './Cart-Item';
import { Checkout } from '../checkout/Checkout'
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import "./Cart.css";

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [orderPlaced] = useState(false);
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  //Funktion för att räkna ihop total priset
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartProducts.forEach(product => {
      totalPrice += product.price * cartItems[product.id];
    });
    return totalPrice;
  };

  //Funktion för att förbereda order datan
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
    <Grid
      animate={{ opacity: 5 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}>
      <div>
        <div>
          <h1>Din Varukorg:</h1>
        </div>
        <div className="cartItems">
          {cartProducts.map(product => (
            <CartItem data={product} key={product.id} />
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
                <Checkout
                  setCartProducts={prepareOrderData}
                  cartProducts={cartProducts}
                  totalAmount={totalAmount}
                />
                <p className="subtotal">Summa: {totalAmount}:-</p>
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
    </Grid>
  );
};

const Grid = styled(motion.div)`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
grid-grap: 3rem;

`;
