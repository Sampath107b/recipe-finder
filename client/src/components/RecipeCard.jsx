import React from 'react';
import {Link} from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({recipe}) => {
  const {idMeal,strMeal,strMealthumb}=recipe;
  return (
    <Link to={`/recipe/${idMeal}`} className='recipe-link'>
      
    <div className="recipe-card">
      <img src={strMealthumb} alt={strMeal} className='recipe-card-image' />
      <div className='recipe-card-body'>
        <h3 className='recipe-card-title'>{strMeal}</h3>
      </div>

    </div>
    </Link >
  );
};

export default RecipeCard;