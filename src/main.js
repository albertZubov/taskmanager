import { createSearch } from "./components/search";
import { createBoard } from "./components/board";
import { createCardEdit } from "./components/card-edit";
import { createCard } from "./components/card";
import { createFilter } from "./components/filter";
import { createLoadMore } from "./components/load-more";
import { createMenu } from "./components/menu";
import { getCard } from "./components/data";

const main = document.querySelector(`.main`);
const CARD_COUNT = 3;

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
render(main, createFilter(13, 0, 0, 1, 1, 115));
render(main, createSearch());

const [boardElem] = render(main, createBoard());
const boardTask = boardElem.querySelector(`.board__tasks`);
render(
  boardTask,
  createCardEdit(
    modifierCl.card.edit,
    modifierCl.card.color.yellow,
    modifierCl.card.repeat,
    `Here is a card with filled data`,
    `yes`,
    `23 September 16:15`,
    `yes`
  )
);

render(
  boardTask,
  new Array(CARD_COUNT).fill(``).map(getCard).map(createCard).join(``)
);

render(boardElem, createLoadMore());
