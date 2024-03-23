import  { useState, useEffect } from 'react';
import { Product } from "./product";
import "./shop.css"

export function Shop() {
  const [products, setProducts] = useState([]);

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
    <div>
      {products.map((product) => (
        // eslint-disable-next-line react/jsx-key
        <Product data={product} />

       
      ))}
    </div>
  );
}

{/* <div key={index}>
<div className="Product">
  <h2>{item.productName}</h2>
  <p>{item.productDescription}</p>
  <p>Price: {item.price} $</p>
  <Button onClick={() => addToCart(item)}>Add to Cart</Button>
</div>
</div> */}