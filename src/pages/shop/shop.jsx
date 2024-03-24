import  { useState, useEffect, useContext } from 'react';
import { ShopContext } from "../../context/shop-context";
import { Product } from "./product";
import "./shop.css"

export function Shop() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(ShopContext); // Access the addToCart function from the context

  
  
  
  useEffect(() => {
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
      <div className='shop'>
        <div className='shopTitle'>
        <h1>Amazing Shirts</h1>
        </div>
        <div className='products'>
      {products.map((product) => (
        // eslint-disable-next-line react/jsx-key
        <Product key={product.id} data={product} addToCart={addToCart} /> // Pass addToCart as prop to Product component

      
      ))}
    </div> 
    </div>
  );
}

