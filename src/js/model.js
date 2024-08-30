//vou deixar qui por enquanto: import {async} from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from "./config";
//Vou deixar aqui por enquanto: import {getURL} from './helpers.js';
import { getJSON } from './helpers.js';
const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
};

export const loadRecipe = async function (id) {
    try{
        const data = await getJSON(`${API_URL}${id}`)
        
        if(!res.ok) throw new Error(`${data.message} (${res.status})`);
        
        const {recipe} = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceURL: recipe.source_url, 
            image: recipe.image_url, 
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };
        console.log(state.recipe);
    } catch(err){
        console.log(`${err}`);
       throw err;
    }
}; 

export const loadSearchResults = async function(query){
    try{
        state.search.query = query; 

        const data = await getJSON(`${API_URL}?search=${query}`);
        console.log(data);

        state.search.results = data.data.recipes.map(rec => {
            return{
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url, 
            };
        });
    }catch(err){
        console.log(`${err}`);;
        throw err;
    }
};

export const getSearchResultsPage = function(page){
    state.search.page = page; 
    
    const start = (page -1) * state.search.resultsPerPage; 
    const end = page * state.search.resultsPerPage; 

    state.search.results.slice(start, end);
}