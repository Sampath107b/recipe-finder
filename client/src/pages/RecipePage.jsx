import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {getRecipeByid} from '../services/recipeService';
const RecipePage = () => {
  const {recipeId}=useParams();
  const [recipe,setRecipe]=useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const fetchRecipeDetails=async ()=>{
      try{
        setLoading(true);
        const data=await getRecipeById(recipeId);
        setRecipe(data);

      }
      catch(err){
        console.error('failed to fetch ',error);
      }
      finally{
        setLoading(false);
      }
    }
    fetchRecipeDetails();
  },[recipeId]);

  const ingredients=[];
  if (recipe){
    for (let i=1;i<=20;i++){
      const ingredient=recipe[`strIngredient${i}`];
      const measure=recipe[`strMeasure${i}`];
      if (ingredient){
        ingredients.push({ingredient,measure});

      }
      else{
        break;
      }
    }
  }

  if(loading){
    return <div className="loading-message">Loading recipe...</div>
  }
  if (!recipe){
    return <div className="error-message">Recipe not found.</div>
  }
  return (
    <div className="recipe-page">
      <h1 className="recipe-page-title">{recipe.strMeal}</h1>

      <div className="recipe-layout">
        <div className="recipe-image-container">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-page-image" />
        </div>

        <div className="recipe-info-container">
          <h2>Ingredients</h2>
          <ul className="ingredient-list">
            {ingredients.map((item, index) => (
              // We use the index as a key here, which is acceptable because this list
              // is static for a given recipe and will not be re-ordered.
              <li key={index}>
                <strong>{item.ingredient}</strong> - {item.measure}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="recipe-instructions">
        <h2>Instructions</h2>
        {/* The instructions often contain newline characters ('\\n'). 
            We split the string by newlines and map over the array to render
            each line in its own paragraph tag, preserving the formatting. */}
        {recipe.strInstructions.split('\n').map((line, index) => (
          line.trim() && <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default RecipePage