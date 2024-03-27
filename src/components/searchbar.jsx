import {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import '../components/searchbar.css';

export const SearchBar = ({ setResults }) => {

const [input, setInput] = useState("");
const fetchData = (value) => {
  fetch('http://localhost:3500/PRODUCTS')
  .then((response) => response.json())
  .then((json) => {
    const results = json.filter((product) => {
      return (
        value &&
        product &&
        product.productName &&
        product.productName.toLowerCase().includes(value)
      );
    });
setResults(results);
  });
};
const handleChange = (value) => {
  setInput(value);
  fetchData(value);
};

  return (
    <div className='topnav'>
       <div className='search-container'>
        <FaSearch className='svg'/>
      <input onChange={(e) => handleChange(e.target.value)} type="text" placeholder="Sök här.." value={input} className='searchbar'/>
      </div>
      </div>
  )
}

