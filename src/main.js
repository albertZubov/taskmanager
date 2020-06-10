import { createSearch } from "./components/search";
import { createBoard } from "./components/board";
import { createCardEdit } from "./components/card-edit";
import { createCard } from "./components/card";
import { createFilter } from "./components/filter";
import { createLoadMore } from "./components/load-more";
import { createMenu } from "./components/menu";
import { getCard, getFilter, getCardEdit } from "./components/data";

const main = document.querySelector(`.main`);
const CARD_COUNT = 7;
const CARD_LOAD_COUNT = 8;

const modifierCl = {
  card: {
    color: {
      black: `black`,
      yellow: `yellow`,
    },
    edit: `edit`,
    repeat: `repeat`,
  },
  btn: {
    edit: `edit`,
    archive: `archive`,
    favorites: `favorites`,
    disabled: `disabled`,
  },
};

// Очистка main
const controlRemove = main.querySelector(`.control`);
main.removeChild(controlRemove);

const render = (container, element) => {
  const div = document.createElement(`div`);
  div.innerHTML = element;
  const childrens = Array.from(div.children);
  childrens.forEach((node) => {
    container.append(node);
  });

  return childrens;
};

render(main, createMenu());
render(main, createSearch());
render(main, createFilter(getFilter()));

const [boardElem] = render(main, createBoard());
const boardTask = boardElem.querySelector(`.board__tasks`);
render(
  boardTask,
  createCardEdit(
    modifierCl.card.edit,
    modifierCl.card.repeat,
    ...[getCardEdit()]
  )
);

render(
  boardTask,
  new Array(CARD_COUNT).fill(``).map(getCard).map(createCard).join(``)
);

render(boardElem, createLoadMore());
const btnLoad = boardElem.querySelector(`.load-more`);
btnLoad.addEventListener(`click`, () => {
  render(
    boardTask,
    new Array(CARD_LOAD_COUNT).fill(``).map(getCard).map(createCard).join(``)
  );
  boardTask.children.length > 23
    ? (btnLoad.style = `display: none`)
    : (btnLoad.style = `display: block`);
});
