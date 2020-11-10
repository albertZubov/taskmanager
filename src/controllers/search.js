import { render, unrender } from "../components/utils";
import { SearchResult } from "../components/search-result";
import { SearchResultInfo } from "../components/search-result-info";
import { SearchResultGroup } from "../components/search-result-group";
import { CardListController } from "./card-list";
import { SearchResultCards } from "../components/search-result-cards";

export class SearchController {
  constructor(cards, container, search, boardController) {
    this._container = container;
    this._search = search;
    this._cards = cards;
    this._boardController = boardController;

    this._searchResult = new SearchResult();
    this._searchResultCards = new SearchResultCards();
    this._searchResultInfo = new SearchResultInfo({});
    this._searchResultGroup = new SearchResultGroup();
    this._cardListController = new CardListController(
      this._searchResultCards.getElement(),
      this._onDataChange.bind(this)
    );

    // console.log(this._boardShow());
  }

  init() {
    this.hide();

    render(this._container, this._searchResult.getElement());
    render(
      this._searchResult.getElement(),
      this._searchResultGroup.getElement()
    );

    this._searchResult
      .getElement()
      .querySelector(`.result__back`)
      .addEventListener(`click`, () => {
        this._search.querySelector(`input`).value = ``;
        this.hide();
        this._boardController.show();
      });

    this._search.querySelector(`input`).addEventListener(`keyup`, (evt) => {
      const { value } = evt.target;
      const cards = this._cards.filter((card) =>
        card.description.includes(value)
      );
      this._showSearchResult(value, cards);
    });
  }

  hide() {
    this._searchResult.getElement().classList.add(`visually-hidden`);
  }

  show() {
    if (this._searchResult.getElement().classList.contains(`visually-hidden`)) {
      this._showSearchResult(``, this._cards);
      this._searchResult.getElement().classList.remove(`visually-hidden`);
    }
  }

  _showSearchResult(text, cards) {
    if (this._searchResultInfo) {
      unrender(this._searchResultInfo.getElement());
      // this._searchResultInfo.removeElement();
    }

    this._searchResultInfo = new SearchResultInfo({
      title: text,
      count: cards.length,
    });

    render(
      this._searchResultGroup.getElement(),
      this._searchResultInfo.getElement()
    );
    render(
      this._searchResultGroup.getElement(),
      this._searchResultCards.getElement()
    );

    this._cardListController.setCards(cards);
  }

  _onDataChange(cards) {
    this._cards = cards;
  }
}
