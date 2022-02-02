import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 1

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  // Patron publisher/subscriber
  // addHandlerRender(handler) {
  //   ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  // }

  _generateMarkup() {
    //console.log(this._data);

    return this._data.map(this._generateMarkupPreview).join('');

    //console.log(recipeList);
    // return recipeList;
  }
  _generateMarkupPreview(result) {
    return `
      <li class="preview">
        <a class="preview__link" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${
      result.title
    }" crossOrigin= "anonymous"/>
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title.slice(0, 20)} ...</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
  }

  /*   _generateMarkupIngredient(ing) {
    return `
      <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing.quantity ? new Fraction(ing.quantity).toString() : ''
      }</div>
      <div class="recipe__description">
      
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>
    `;
  } */
}

export default new ResultView();
