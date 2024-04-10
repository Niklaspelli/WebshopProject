import { Link } from 'react-router-dom';

export const SearchResult = ({ result }) => {

  return (
    <div>
      <h1>Sökresultat:</h1>
      <Link to={`/productDetails/${result.id}`}>
        <div className='card'>
          <b>{result.productName}</b>
          <img src={result.productImage} alt={result.productName} className='itemImage' />
        </div>
      </Link>
    </div>
  )
}


