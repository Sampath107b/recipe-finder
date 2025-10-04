import React,{useState} from 'react'

const SearchBar = ({onSearch}) => {
  const [query,setQuery]=useState("");
  const handleSubmit =(event)=>{
    event.preventDefault();
    if (query.trim()){
      onSearch(query);
    }
    setQuery('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text"
        placeholder='Search for a recipe...'
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
        
        />
        <button type='submit'>Search</button>
      </form>
    </div>
  );
};

export default SearchBar;