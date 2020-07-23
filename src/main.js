import { createSearch } from "./components/search";
import { createBoard } from "./components/board";
import { Card } from "./components/card";
import { CardEdit } from "./components/card-edit";
import { createFilter } from "./components/filter";
import { createLoadMore } from "./components/load-more";
import { createMenu } from "./components/menu";
import { getCard, getFilter } from "./components/data";

const main = document.querySelector(`.main`);
const CARD_COUNT = 8;
const CARD_LOAD_COUNT = 8;
 
// Очистка main
const controlRemove = main.querySelector(`.control`);
main.removeChild(controlRemove);

const render = (container, element) => {
  let childrens = element;

  if (typeof element === `string`) {
    const div = document.createElement(`div`);
    div.innerHTML = element;
    childrens = Array.from(div.children);
    childrens.forEach((node) => {
      container.append(node);
    });
  } else {
    container.append(element);
  }

  return childrens;
};

render(main, createMenu());
render(main, createSearch());
render(main, createFilter(getFilter()));

const [boardElem] = render(main, createBoard());
const boardTask = boardElem.querySelector(`.board__tasks`);

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

const arrDataCards = (count) => new Array(count).fill(``).map(getCard);
const arrCards = (count) =>
  arrDataCards(count).forEach((data) => renderCard(data));

arrCards(CARD_COUNT);

render(boardElem, createLoadMore());

const btnLoad = boardElem.querySelector(`.load-more`);
btnLoad.addEventListener(`click`, () => {
  arrCards(CARD_LOAD_COUNT);

  btnLoad.style = `display: ${
    boardTask.children.length < 23 ? `block` : `none`
  }`;
});
