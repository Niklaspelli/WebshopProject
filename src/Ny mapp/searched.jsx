
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Searched() {
  const [data, setData] = useState([]);
  const params = useParams();

  useEffect(() => {
    const getSearched = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3000`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    getSearched(); // Removed params.data from here
  }, [params.id]); // Added params.data to the dependency array

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <div>
            <h2>{item.name}</h2>
            <p>ID: {item.id}</p>
            <p>EAN: {item.articleNumber}</p>
            <p>Price: {item.price}kr</p>
          </div>
        </div>
      ))}
    
    </div>
  );
}

export default Searched;




/* 
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Searched() {
  const [data, setData] = useState([]);
  let params = useParams();

  const getSearched = async (data) => {
    axios.get(`http://localhost:3000/data?s${data}`)
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });

    useEffect(() => {
      getSearched(params.search)
  }, [params.search]);
 */

/*   useEffect(() => {
    axios.get('http://localhost:3000/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []); */



/* const getSearched = async (searchedRecipes) => {
const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedRecipes}`)
const data = await api.json();
setSearchedRecipes(data.meals)
};

useEffect(() => {
    getSearched(params.search)
}, [params.search]); */


/* return (
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
}

export default Searched; */



/* const getSearched = async (searchedRecipes) => {
const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedRecipes}`)
const data = await api.json();
setSearchedRecipes(data.meals)
};

useEffect(() => {
    getSearched(params.search)
}, [params.search]); */