import { state, loadRecipe } from './model';
import recipeView from './views/recipeViwe';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    //1) loading recipe
    await loadRecipe(id);

    // 2) rendering recipe
    recipeView.render(state.recipe);
  } catch (err) {
    console.log(err);
  }
};
controlRecipes();
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
