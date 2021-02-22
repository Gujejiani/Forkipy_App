import icons from 'url:../../img/icons.svg';
import { RECIPE_PER_PAGE } from '../config';
import View from './View.js';
class AddRecipeView extends View {
  _message = 'Recipe was succesfully uploaded';

  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener(
      'click',
      function () {
        this.toggleWindow();
        console.log(this._overlay);
      }.bind(this)
    );
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener(
      'click',
      function () {
        this.toggleWindow();
      }.bind(this)
    );
    this._overlay.addEventListener(
      'click',
      function () {
        console.log('close 22');
        this.toggleWindow();
      }.bind(this)
    );
  }
  _generateMarkup() {}

  // Page 1 and there No other pagesk
}
export default new AddRecipeView();
