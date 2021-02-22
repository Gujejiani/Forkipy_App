import icons from 'url:../../img/icons.svg';
import { ERROR_MESSAGE } from '../config';
import View from './View.js';
import previewView from './previewView.js';
class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _message = '';

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new ResultView();
/* <div class="preview__user-generated">
<svg>
<use href="${icons}#icon-user"></use>
</svg>
</div>

*/
