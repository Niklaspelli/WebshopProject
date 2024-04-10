import { useState, useEffect, useContext } from 'react';
import { ShopContext } from "../../context/Shop-Context";
import { Product } from "./Product";
import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import "./Shop.css"

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
    <Grid
      animate={{ opacity: 5 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}>
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
    </Grid>
  );
}



const Grid = styled(motion.div)`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
grid-grap: 3rem;

`;