import { render } from "../components/utils";
import { createLoadMore } from "../components/load-more";
import { Sort } from "../components/sort";
import { getArrDataCards, main } from "../main";
import { CardController, modeCard } from "./card";
export class BoardController {
  constructor(container, cards, board) {
    this._container = container;
    this._cards = cards;
    this._board = board;
    this._sort = new Sort();

    this._subscriptions = [];
    this._renderCard = this._renderCard.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    const CARD_LOAD_COUNT = 8;

    const boardContainer = render(main, this._board.getElement());
    render(boardContainer, this._sort.getElement());
    render(boardContainer, this._container);

    const renderCardsArray = (arrData) => {
      arrData.forEach(this._renderCard);
    };

    renderCardsArray(this._cards);

    render(boardContainer, createLoadMore());

    const btnLoad = boardContainer.querySelector(`.load-more`);
    btnLoad.addEventListener(`click`, () => {
      renderCardsArray(getArrDataCards(CARD_LOAD_COUNT));

      btnLoad.style = `display: ${
        this._container.children.length < 23 ? `block` : `none`
      }`;
    });

    // Повесил обработчик на Сортировку
    this._sort
      .getElement()
      .addEventListener(`click`, (evt) => this._onClickSort(evt));
  }

  _cleanContainer() {
    this._container.innerHTML = ``;
    this._subscriptions.length = 0;
  }

  _renderCard(card) {
    const cardController = new CardController(
      this._container,
      card,
      this._onDataChange,
      this._onChangeView,
      modeCard.default
    );

    this._subscriptions.push(cardController);
  }

  _onChangeView() {
    this._subscriptions.forEach((subscriptionItem) =>
      subscriptionItem.setDefaultView()
    );
  }

  _onDataChange(newData, oldData) {
    const index = this._cards.findIndex((card) => card === oldData);

    if (newData === null) {
      this._cards = [
        ...this._cards.slice(0, index),
        ...this._cards.slice(index + 1),
      ];
    } else {
      this._cards[index] = newData;
    }

    this._cleanContainer();
    this._cards.forEach(this._renderCard);
  }

  show() {
    this._board.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._board.getElement().classList.add(`visually-hidden`);
  }

  createCard() {
    const defaultCard = {
      description: `Find money for travel`,
      color: `yellow`,
      tags: new Set(),
      dueDate: new Date(),
      dueTime: new Date(),
      isRepeat: true,
      isDate: true,
      repeatingDays: {},
    };

    new CardController(
      this._container,
      defaultCard,
      this._onDataChange,
      this._onChangeView,
      modeCard.add
    );
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
        sortedDateUp.forEach(this._renderCard);
        break;

      case `date-down`:
        const sortedDateDown = this._cards
          .slice()
          .sort((first, last) => last.dueDate - first.dueDate);
        sortedDateDown.forEach(this._renderCard);
        break;

      case `default`:
        this._cards.forEach(this._renderCard);
        break;
    }
  }
}
