import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {getRecipeById} from '../services/recipeService';
import Loader from '../components/Loader';
import './RecipePage.css';
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
        console.error('failed to fetch ',err);
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
    return <Loader/>;
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
             
              <li key={index}>
                <strong>{item.ingredient}</strong> - {item.measure}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="recipe-instructions">
        <h2>Instructions</h2>
        
        {(recipe?.strInstructions?.split("\n")|| []).map((line, index) => (
          line.trim() && <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default RecipePage