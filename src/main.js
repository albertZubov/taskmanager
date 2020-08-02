import { createSearch } from "./components/search";
import { createBoard } from "./components/board";
import { createBoardFilter } from "./components/board-filter";
import { Card } from "./components/card";
import { CardEdit } from "./components/card-edit";
import { createFilter } from "./components/filter";
import { createLoadMore } from "./components/load-more";
import { createMenu } from "./components/menu";
import { getCard, getFilter } from "./components/data";
import { NoCard } from "./components/no-card";
import { render } from "./components/utils";

const main = document.querySelector(`.main`);
const CARD_COUNT = 8;
const CARD_LOAD_COUNT = 8;

// Очистка main
const controlRemove = main.querySelector(`.control`);
main.removeChild(controlRemove);

const noCard = new NoCard().getElement();
const renderMessageNoCard = () => {
  render(render(main, createBoard())[0], noCard);
};

render(main, createMenu());
render(main, createFilter(getFilter()));

if (CARD_COUNT) {
  render(main, createSearch());

  const [boardContainer] = render(main, createBoard(createBoardFilter()));
  const [, boardTask] = boardContainer.children;

  const renderCard = (data) => {
    const card = new Card(data);
    const cardEdit = new CardEdit(data);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        boardTask.replaceChild(card.getElement(), cardEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    card
      .getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        boardTask.replaceChild(cardEdit.getElement(), card.getElement());
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
        boardTask.replaceChild(card.getElement(), cardEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(boardTask, card.getElement());
  };

  const getArrDataCards = (count) => new Array(count).fill(``).map(getCard);
  const renderCardsArray = (count) =>
    getArrDataCards(count).forEach((data) => renderCard(data));

  renderCardsArray(CARD_COUNT);
  render(boardContainer, createLoadMore());

  const btnLoad = boardContainer.querySelector(`.load-more`);
  btnLoad.addEventListener(`click`, () => {
    renderCardsArray(CARD_LOAD_COUNT);

    btnLoad.style = `display: ${
      boardTask.children.length < 23 ? `block` : `none`
    }`;
  });
} else {
  renderMessageNoCard();
}
