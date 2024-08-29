import * as model from './model.js'; 
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime'; 

if(module.hot){
  module.hot.accept(); 
}

const controlRecipes = async function () {
  try{
    const id = window.location.hash.slice(1);
    if(!id) return; 
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    recipeViewecipeView.render(model.state.recipe);
  }catch(err){
    recipeView.renderError(''); 
  }
};

const controlSearchResults = async function(){
  try{  
    resultsView.renderSpinner();

    const query = searchView.getQuery(query);
    if(!query) return; 
    
    await model.loadSearchResults();

    resultsView.render(model.state.search.results);
  }catch(err){
    console.log(err);
  }
};
controlSearchResults();

const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}
init();

/* The array does the same as this two lines of code here:
window.addEventListener('hashchange', showRecipe);
window.addEventListener('load', showRecipe);
*/