import { render, unrender } from "../components/utils";
import { main } from "../main";
import { CreateLoadMore } from "../components/load-more";
import { Sort } from "../components/sort";
import { CardListController } from "./card-list";
import { CardList } from "../components/card-list";
import { Board } from "../components/board";

const CARD_LOAD_COUNT = 8;
export class BoardController {
  constructor(cards) {
    this._container = new CardList().getElement();
    this._cards = cards;
    this._board = new Board();
    this._sort = new Sort();
    this._bntLoadMore = new CreateLoadMore();
    this._creatingCard = null;
    this._currentCards = [];
    this._showedCards = CARD_LOAD_COUNT;

    this._subscriptions = [];
    this._cardListController = new CardListController(
      this._container,
      this._onDataChange.bind(this)
    );
  }

  show() {
    if (this.cards !== this._currentCards) {
      this._currentCards = this._cards;
      this._renderBoard();
    }

    this._board.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._board.getElement().classList.add(`visually-hidden`);
  }

  _renderBoard() {
    const boardContainer = render(main, this._board.getElement());
    render(boardContainer, this._sort.getElement());
    render(boardContainer, this._container);

    render(boardContainer, this._bntLoadMore.getElement());

    if (this._showedCards >= this._cards.length) {
      unrender(this._bntLoadMore.getElement());
    }

    this._cardListController.setCards(this._cards.slice(0, this._showedCards));

    this._bntLoadMore
      .getElement()
      .addEventListener(`click`, () => this._onClickBtnLoadMore());

    // Повесил обработчик на Сортировку
    this._sort
      .getElement()
      .addEventListener(`click`, (evt) => this._onClickSort(evt));
  }

  _cleanContainer() {
    this._container.innerHTML = ``;
    this._subscriptions.length = 0;
  }

  _onDataChange(cards) {
    this._cards = [...cards, ...this._cards.slice(this._showedCards)];

    // Поправить, некорректно отрабатывает
    this._showedCards = cards.length;

    this._renderBoard();
  }

  createCard() {
    this._cardListController.createCard();
  }

  _onClickBtnLoadMore() {
    this._cardListController.addCards(
      this._cards.slice(this._showedCards, this._showedCards + CARD_LOAD_COUNT)
    );

    this._showedCards += CARD_LOAD_COUNT;

    if (this._showedCards >= this._cards.length) {
      unrender(this._bntLoadMore.getElement());
    }
  }

  _onClickSort(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._cleanContainer();

    /* eslint-disable */

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedDateUp = this._cards
          .slice()
          .sort((first, last) => first.dueDate - last.dueDate);
        this._cardListController.setCards(
          sortedDateUp.slice(0, this._showedCards)
        );

        break;

      case `date-down`:
        const sortedDateDown = this._cards
          .slice()
          .sort((first, last) => last.dueDate - first.dueDate);
        this._cardListController.setCards(
          sortedDateDown.slice(0, this._showedCards)
        );
        break;

      case `default`:
        this._cardListController.setCards(
          this._cards.slice(0, this._showedCards)
        );
        break;
    }
  }
}
