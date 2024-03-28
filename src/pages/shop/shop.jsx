import  { useState, useEffect, useContext } from 'react';
import { ShopContext } from "../../context/shop-context";
import { Product } from "./product";
import "./shop.css"

export function Shop() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(ShopContext); // Access the addToCart function from the context
  
  useEffect(() => {
    fetch('http://localhost:3000/PRODUCTS')
      .then(res => res.json())
      .then(products => {
        setProducts(products.PRODUCTS);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [products]);

  return (
      <div className='shop'>
        <div className='shopTitle'>
        <h1>Amazing Shirts</h1>
        </div>
        <div className='products'>
        {products.length > 0 && products.map((product) => (
          <Product key={product.id} data={product} addToCart={addToCart} />
        ))}
    </div> 
    </div>
  );
}