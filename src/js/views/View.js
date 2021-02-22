import icons from 'url:../../img/icons.svg';
import { ERROR_MESSAGE } from '../config';
export default class View {
  _data;
  /**
   * Render the recived to the DOM
   * @param {Object | Object[]} data  The data to rendered (e.g. recipe)
   * @param {boolean} [render = true]   if false, create markuo string instead of rendering to the DOM
   *@returns {undefined | string} A markup string is returned if render=false
   *@this {Obkect} View instance
   * @author Kakha GUjejiani
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length < 1))
      return this.renderError(ERROR_MESSAGE);

    this._data = data;
    const markUp = this._generateMarkup();

    if (!render) return markUp;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = ` <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> -->`;
    this._parentElement.innerHTML = '';

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length < 1))
    //   return this.renderError(ERROR_MESSAGE);

    this._data = data;
    const newMarkUp = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥💥 ', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }
      //update changes Attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderError(err) {
    const markUp = `  <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${err}</p>
    </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderMessage(message = this._message) {
    const markUp = `  <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}
