import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from './cart-item';

export function Cart() {
  const [products, setProducts] = useState([]);
  const { cartItems } = useContext(ShopContext);

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
        {products.map(product => {
          // Check if the product is in the cart (quantity > 0)
          if (cartItems[product.id] !==0) {
            return <CartItem key={product.id} data={product} />;
          }
          return null; // Do not render if quantity is 0
        })}
      </div>
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