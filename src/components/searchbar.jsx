import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';
import './searchbar.css';

export const Searchbar = () => {

const [input, setInput] = useState("");
const navigate = useNavigate();

const submitHandler = (e) => {
  e.preventDefault();
  navigate('/searched/'+input);
};



  return (
    <div className='topnav'>

       <div className='search-container'>
      <form onSubmit={submitHandler}>
     <FaSearch className='svg'/>
      <input onChange={(e) => setInput(e.target.value)} type="text" placeholder="Sök här.." value={input} className='searchbar'/>
      
      </form>
    </div></div>
  )
}

