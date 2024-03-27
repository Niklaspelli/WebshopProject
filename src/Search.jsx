import { useState } from 'react'
import "./components/searchbar.css";

import { SearchBar } from "./components/searchbar";
import SearchResultsList from './pages/searchresult/SearchResultsList';


export const Search = () => {

  const [results, setResults] = useState([]);
  return (
    <div>
      <SearchBar setResults={setResults}/>
      {results && results.length > 0 &&<SearchResultsList results={results} />}
    </div>
  )
}


