import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Item() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        
        <div key={index}>
            <div>
                <h2>{item.name}</h2>
            {item.id} 
           <p>EAN: {item.articleNumber}</p>
           <p>Price: {item.price}kr</p>
            </div>
            </div>
      ))}
      <p>från Item filen</p>
    </div>
  );
};

export default Item;