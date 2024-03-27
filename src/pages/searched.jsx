import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();

  const getSearched = async () => {
    try {
      const api = await fetch("http://localhost:3500/PRODUCTS/" + params.search);
      const data = await api.json();
      console.log('Data from API:', data); // Log the data received from the API
      setSearchedRecipes(data.PRODUCTS);
    } catch (error) {
      console.error('Error fetching searched t-shirts:', error);
    }
  };
  
  useEffect(() => {
    console.log('Params.search:', params.search); // Log the value of params.search
    if (params.search) {
      getSearched(); // Only call getSearched if params.search is defined
    }
  }, []);

  useEffect(() => {
    console.log('Searched Recipes:', searchedRecipes); // Log the searchedRecipes state
  }, [searchedRecipes]);

  return (
    <div>
      {searchedRecipes.length > 0 ? (
        searchedRecipes.map((item, index) => (
          <div key={index}>
            <h4>{item.productName}</h4>
          </div>
        ))
      ) : (
        <p>No T-shirts found</p>
      )}
    </div>
  );
};
