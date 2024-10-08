import * as model from './model.js'; 
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// SÓ por precaução import { async } from 'regenerator-runtime'; 

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

    const query = searchView.getQuery();
    if(!query) return; 
    
    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  }catch(err){
    console.log(err);
  }
};

const controlPagination = function(goToPage){
  resultsView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search);
}

const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerRender(controlPagination);
};
init();