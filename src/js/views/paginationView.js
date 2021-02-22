import icons from 'url:../../img/icons.svg';
import { RECIPE_PER_PAGE } from '../config';
import View from './View.js';
class Pagination extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const page = +btn.dataset.goto;
      console.log(page);
      handler(page);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / RECIPE_PER_PAGE);

    if (currentPage === 1 && numPages > 1) {
      return `<button data-goto=${
        currentPage + 1
      }  class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    //Last page
    if (currentPage === numPages && numPages > 1) {
      return `<button data-goto=${
        currentPage - 1
      }  class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>`;
    }
    //other Page

    if (currentPage < numPages) {
      return `
       <button data-goto=${
         currentPage + 1
       } class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      <button data-goto=${
        currentPage - 1
      } class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>
      
      `;
    }

    // Page 1 and there No other pagesk

    return 'only one page';
  }
}
export default new Pagination();
