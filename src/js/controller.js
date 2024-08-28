import * as model from './model.js';
import { API_URL } from './config.js'; 
import recipeView from './views/recipeView.js'

import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function () {
  try{
    const id = window.location.hash.slice(1);
    if(!id) return; 
    recipeView.renderSpinner();
    renderSpinner(recipeContainer);
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
    const recipeView = new recipeView(model.state.recipe);
  }catch(err){
    alert(err);
  }
}

arr = ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
/* The array does the same as this two lines of code here:
window.addEventListener('hashchange', showRecipe);
window.addEventListener('load', showRecipe);
*/