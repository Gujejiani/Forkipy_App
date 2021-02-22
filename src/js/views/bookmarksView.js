import icons from 'url:../../img/icons.svg';
import { ERROR_MESSAGE } from '../config';
import View from './View.js';
import previewView from './previewView.js';
import resultView from './resultView';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _message = '';

  _ERROR_MESSAGE = 'no bookmarks found';

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  renderError(err) {
    const markUp = `  <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>"No bookmarks yet. Find a nice recipe and bookmark it :)"</p>
    </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}

export default new BookmarksView();
/* <div class="preview__user-generated">
<svg>
<use href="${icons}#icon-user"></use>
</svg>
</div>

*/
