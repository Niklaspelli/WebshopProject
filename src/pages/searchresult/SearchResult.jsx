import React from 'react'
import '../../components/searchbar.css';

export const SearchResult = ({ result }) => {
  return (
  <div>
  <h1>Sökresultat:</h1>
    <div className='card'> 
    
    <b>{result.productName}</b>
    <img src={result.productImage} className='itemImage'/>
    <div className='description'> 
  
      </div>
    </div>
</div>
  )
}


