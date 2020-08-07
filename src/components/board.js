import { AbstractComponent } from "./absctract-component";
import { render } from "./utils";
import { createMenu } from "./menu";
import { createFilter } from "./filter";
import { getFilter } from "./data";
import { Card } from "./card";
import { CardEdit } from "./card-edit";
import { createLoadMore } from "./load-more";
import { createSearch } from "./search";
import { Sort } from "./sort";
import { getArrDataCards } from "../main";
import { NoCard } from "./no-card";

export class Board extends AbstractComponent {
  getTemplate() {
    return `
  <section class="board container">
    </section>
  `;
  }
}

export class BoardController {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;
    this._board = new Board();
    this._sort = new Sort();
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
        arrData.forEach((cardData) => this._renderCard(cardData));
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

  _renderCard(data) {
    const card = new Card(data);
    const cardEdit = new CardEdit(data);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.replaceChild(card.getElement(), cardEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    card
      .getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._container.replaceChild(cardEdit.getElement(), card.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    cardEdit
      .getElement()
      .querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    cardEdit
      .getElement()
      .querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    cardEdit
      .getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, () => {
        this._container.replaceChild(card.getElement(), cardEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._container, card.getElement());
  }

  _onClickSort(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._container.innerHTML = ``;

    /* eslint-disable */

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedDateUp = this._cards
          .slice()
          .sort(
            (first, last) =>
              Date.parse(first.dueDate) - Date.parse(last.dueDate)
          );
        sortedDateUp.forEach((data) => this._renderCard(data));
        break;

      case `date-down`:
        const sortedDateDown = this._cards
          .slice()
          .sort(
            (first, last) =>
              Date.parse(last.dueDate) - Date.parse(first.dueDate)
          );
        sortedDateDown.forEach((data) => this._renderCard(data));
        break;

      case `default`:
        this._cards.forEach((data) => this._renderCard(data));
        break;
    }
  }
}
