import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 1

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateTotalPagesMarkup() {
    return 'This is the number of pages';
  }

  _generateMarkup() {
    const currentPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    let markUp = `
      <div>Page ${currentPage} of ${numPages}</div>
    `;

    //First page 1, there are other pages
    if (currentPage === 1 && numPages > 1) {
      markUp += `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
      </svg>
      </button>
      `;
      return markUp;
    }

    //Last page
    if (currentPage === numPages && numPages > 1) {
      markUp += `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
    </button>
      `;
      return markUp;
    }
    //Other page
    if (currentPage < numPages) {
      markUp += `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
      </button>
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
      return markUp;
    }

    //Page 1, there are NO other pages
    return '';
  }
}

export default new PaginationView();
