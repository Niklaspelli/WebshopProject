import {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import { Container, Form, FormControl, Button } from 'react-bootstrap';
import './Searchbar.css';

export const SearchBar = ({ setResults }) => {

const [input, setInput] = useState("");
const fetchData = (value) => {
  fetch('http://localhost:3000/PRODUCTS')
  .then((response) => response.json())
  .then((json) => {
    const results = json.PRODUCTS.filter((product) => {
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
    <Container className="d-flex justify-content-center">
    <Form inline style={{ width: '600px', border: "none"}}>
    <div className='topnav'> 
       
        <FormControl 
        placeholder="Sök din T-shirt.."  
        className='mr-sm-5' size="lg" 
        onChange={(e) => handleChange(e.target.value)} 
        type="text" 
        value={input}
        style={{ backgroundColor: 'grey', color: 'white',  border: 'none' }} 
        />
      </div>  
      </Form>
    </Container>
  )
}