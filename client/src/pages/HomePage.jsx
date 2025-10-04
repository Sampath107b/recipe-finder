import React,{useState} from 'react'
import SearchBar from '../components/SearchBar';
import {searchRecipes} from '../services/recipeService';
import './HomePage.css';
import RecipeCard from '../components/RecipeCard';
const HomePage = () => {
  const [recipes,setRecipes]=useState([]);
  const [searched,setSearched]=useState(false);
  
  const handleSearch=async(query)=>{
    const results=await searchRecipes(query);
    setRecipes(results);
    setSearched(true);
  }

  return (
    <div className="home-page">
      <h1>Recipe Finder</h1>
      <p>Search for your favorite recipes here!</p>
      <SearchBar onSearch={handleSearch}/>
      <div className='recipe-list'>
        {recipes.map(recipe=>(
          <RecipeCard key={recipe.idMeal} recipe={recipe}/>
        ))}
      </div>
      {searched && recipes.length===0 &&(
        <p className='np-results-message'>          No recipes found. Please try a different search term!
</p>
      )}
      </div>
  );
};

export default HomePage