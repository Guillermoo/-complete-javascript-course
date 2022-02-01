import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
    alert(err);
  }
};

//showRecipe();

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
