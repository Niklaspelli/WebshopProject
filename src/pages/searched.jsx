import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Searched() {
  const [searchedTshirts, setSearchedTshirts] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3500/PRODUCTS?i=${params.search}`);
        const data = await response.json();
        console.log("Data received from API:", data); // Log the data received from the API
        setSearchedTshirts(data.PRODUCTS || []); // Set searchedTshirts to the received data
      } catch (error) {
        console.error('Error fetching searched T-shirts:', error);
        setSearchedTshirts([]); // Ensure searchedTshirts is set to an empty array in case of error
      }
    };
  
    console.log("Search parameter:", params.search); // Log the search parameter
    fetchData();
  }, [params.search]);

  return (
    <div>
      {searchedTshirts.length > 0 ? (
        searchedTshirts.map((item) => (
          <div key={item.id}>
            <h2>{item.productName}</h2>
            <p>{item.productDescription}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))
      ) : (
        <p>No T-shirts found</p>
      )}
    </div>
  );
}

export default Searched;