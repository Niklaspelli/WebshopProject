import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';

export const Searchbar = () => {

const [input, setInput] = useState("");
const navigate = useNavigate();

const submitHandler = (e) => {
  e.preventDefault();
  navigate('/searched/'+input);
};



  return (
    <div>
       <div className='topnav'>
      <form onSubmit={submitHandler}>
     <FaSearch />
      <input onChange={(e) => setInput(e.target.value)} type="text" placeholder="Sök här.." value={input} className='topnav'/>
      
      </form>
    </div></div>
  )
}

