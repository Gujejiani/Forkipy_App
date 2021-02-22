import {
  state,
  loadRecipe,
  loadSearchResults,
  getSearchResultsPage,
  updateServings,
  addBookmark,
  deleteBookMark,
  uploadRecipe,
} from './model';
import recipeView from './views/recipeViwe';
import resultsView from './views/resultView';
import bookmarksView from './views/bookmarksView';
import paginationView from './views/paginationView';
import addRecipeView from './views/addRecipeView';
import { ERROR_MESSAGE } from './config';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import searchView from './views/searchView';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 0) update results view to mark slected
    resultsView.update(getSearchResultsPage());

    //1) loading recipe
    await loadRecipe(id);

    // 2) rendering recipe
    recipeView.render(state.recipe);
    bookmarksView.update(state.bookmarks);
  } catch (err) {
    recipeView.renderError(ERROR_MESSAGE);
  }
};
const controlSearchResults = async function () {
  try {
    // 1) get search query

    const query = searchView.getQuery();

    if (!query) return resultsView.renderError(ERROR_MESSAGE);
    resultsView.renderSpinner();

    // 2) Load search results
    await loadSearchResults(`${query}`);

    // 3) render results
    // resultsView.render(state.search.results);
    resultsView.render(getSearchResultsPage(1));
    console.log('render 1');

    //4) render initial pagination
    paginationView.render(state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (page) {
  // 1) render page
  resultsView.render(getSearchResultsPage(page));

  //2) render correct ui
  paginationView.render(state.search);
};

const controlServings = function (newServing) {
  //Update the recipe servings (in state)
  updateServings(newServing);
  // update the recipe view

  // recipeView.render(state.recipe);
  recipeView.update(state.recipe);
};

const controlAddBookMark = function () {
  // 1) add/remove bookmark
  if (!state.recipe.bookmarked) addBookmark(state.recipe);
  // 2) remove bookmark
  else deleteBookMark(state.recipe.id);
  recipeView.update(state.recipe);

  // 3) Render boojmarks
  bookmarksView.render(state.bookmarks);
};

const controlerControlBookmarks = function () {
  bookmarksView.render(state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //show loadling spinner
    addRecipeView.renderSpinner();
    await uploadRecipe(newRecipe);
    console.log(state.recipe);

    //render recipe
    recipeView.render(state.recipe);

    // Success message
    addRecipeView.renderMessage();

    //render bookmark view
    bookmarksView.render(state.bookmarks);

    //change ID in URL
    window.history.pushState(null, '', `${state.recipe.id}`);

    //close form window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, 2500);
  } catch (err) {
    addRecipeView.renderError(err.message + '😋😋😋😍');
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlerControlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookMark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
