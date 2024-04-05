import {useState, useRef } from 'react';
import { Container, Form, FormControl } from 'react-bootstrap';
import './Searchbar.css';

export const SearchBar = ({ setResults }) => {
  const inputRef = useRef(null);

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
  const Ref = inputRef.current.value;
  setInput(value);
  fetchData(value);
  fetchData(Ref);
};

  return (
    <Container className="d-flex justify-content-center">
    <Form inline style={{ width: '600px', border: "none"}}>
      <FormControl 
        placeholder="Sök din T-shirt.."  
        className='mr-sm-6 m-2' size="lg" 
        onChange={(e) => handleChange(e.target.value)} 
        type="text" 
        value={input}
        ref={inputRef}
        style={{ backgroundColor: 'grey', color: 'white',  border: 'none' }} 
        />
      </Form>
    </Container>
  )
}