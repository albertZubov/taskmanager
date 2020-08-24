import { render } from "../components/utils";
import { createMenu } from "../components/menu";
import { createFilter } from "../components/filter";
import { getFilter } from "../components/data";
import { createLoadMore } from "../components/load-more";
import { createSearch } from "../components/search";
import { Sort } from "../components/sort";
import { getArrDataCards } from "../main";
import { NoCard } from "../components/no-card";
import { Board } from "../components/board";
import { CardController } from "./card";

export class BoardController {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;
    this._board = new Board();
    this._sort = new Sort();

    this._subscriptions = [];
    this._renderCard = this._renderCard.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    const CARD_LOAD_COUNT = 8;

    // Очистка main
    const main = document.querySelector(`.main`);
    const controlRemove = main.querySelector(`.control`);
    main.removeChild(controlRemove);

    const noCard = new NoCard().getElement();
    const renderMessageNoCard = () => {
      render(render(main, this._board.getElement()), noCard);
    };

    render(main, createMenu());
    render(main, createFilter(getFilter()));

    if (this._cards.length) {
      render(main, createSearch());

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
    } else {
      renderMessageNoCard();
    }

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
      this._onChangeView
    );

    this._subscriptions.push(cardController);
  }

  _onChangeView() {
    this._subscriptions.forEach((subscriptionItem) =>
      subscriptionItem.setDefaultView()
    );
  }

  _onDataChange(newData, oldData) {
    this._cards[this._cards.findIndex((item) => item === oldData)] = newData;
    this._cleanContainer();
    this._cards.forEach(this._renderCard);
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
