import React, { useState, useEffect } from 'react';
/* import axios from 'axios'; */

function Products ({ onSelectItem }) {
  /* const [data, setData] = useState([]); */
  const [products, setProducts] = useState(null);
  
useEffect(() => {
  fetch('http://localhost:8000/PRODUCTS')
  .then(res => {
    return res.json()
  })
  .then(products => {
setProducts(products);
  }) 
}, []);

 /*  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);
 */

  };

  return (
    {products.map((item, index) => (
      <div key={index}>
        
          {item.productName}
      </div>   


  );   
    
};

export default Products;

{/*     {data.map((item, index) => (
        <div key={index}>
          <div className='itemCard'>
            <p>från Item filen</p>
            <h2>{item.productTitle}</h2>
            {item.productId} 
            <p>Beskrivning: {item.productDescription}</p>
            <p>Pris: {item.productPrice}kr</p>
            <button onClick={() => handleClick(item)}>Lägg till</button>
          </div>
        </div>
      ))}
    </div> */}