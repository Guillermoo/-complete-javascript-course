class SearchView {
  #parenEl = document.querySelector('.search');

  getQuery() {
    const query = this.#parenEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parenEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parenEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
