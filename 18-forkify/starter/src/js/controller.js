import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    recipeView.renderSpinner();

    // 1( loading recipe)
    await model.loadRecipe(id); //model cambia el estado de recipe

    // 2) rendering recipe
    recipeView.render(model.state.recipe);

    //recipeContainer.insertAdjacentHTML = ('afterbegin', markup);
  } catch (err) {
    //alert(err);
    recipeView.renderError();
  }
};

const controlSearchResuls = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResuls);
};
init();
