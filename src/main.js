import { createSearch } from "./components/search";
import { createBoard } from "./components/board";
import { createCardEdit } from "./components/card-edit";
import { createCard } from "./components/card";
import { createFilter } from "./components/filter";
import { createLoadMore } from "./components/load-more";
import { createMenu } from "./components/menu";

const main = document.querySelector(`.main`);

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
  // div.insertAdjacentHTML(`beforeEnd`, element);
  const node = div.firstElementChild;
  container.append(node);

  return node;
};

render(main, createMenu());
render(main, createFilter(13, 0, 0, 1, 1, 115));
render(main, createSearch());

const boardElem = render(main, createBoard());
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
  createCard(
    modifierCl.card.color.black,
    modifierCl.btn.edit,
    modifierCl.btn.archive,
    modifierCl.btn.favorites,
    modifierCl.btn.disabled,
    `Example task with custom color.`,
    `23 September`,
    `16:15`
  )
);

render(
  boardTask,
  createCard(
    modifierCl.card.color.black,
    modifierCl.btn.edit,
    modifierCl.btn.archive,
    modifierCl.btn.favorites,
    modifierCl.btn.disabled,
    `Example task with custom color.`,
    `23 September`,
    `16:15`
  )
);

render(
  boardTask,
  createCard(
    modifierCl.card.color.black,
    modifierCl.btn.edit,
    modifierCl.btn.archive,
    modifierCl.btn.favorites,
    modifierCl.btn.disabled,
    `Example task with custom color.`,
    `23 September`,
    `16:15`
  )
);

render(boardElem, createLoadMore());
