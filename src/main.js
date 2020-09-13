import { BoardController } from "./controllers/board";
import { CardList } from "./components/card-list";
import { getCard } from "./components/data";
import { NoCard } from "./components/no-card";
import { render } from "./components/utils";
import { createMenu } from "./components/menu";
import { createFilter } from "./components/filter";
import { getFilter } from "./components/data";
import { createSearch } from "./components/search";
import { Board } from "./components/board";
import { MainController } from "./controllers/main";
import { Statistics } from "./components/statistics";

export const CARD_COUNT = 8;
const board = new Board();
const boardTask = new CardList().getElement();
const statistics = new Statistics().getElement();
statistics.classList.add(`visually-hidden`);

// Очистка main
export const main = document.querySelector(`.main`);
const controlRemove = main.querySelector(`.control`);
main.removeChild(controlRemove);

export const getArrDataCards = (count) =>
  new Array(count).fill(``).map(getCard);

const boardController = new BoardController(
  boardTask,
  getArrDataCards(CARD_COUNT),
  board
);

const noCard = new NoCard().getElement();
const renderMessageNoCard = () => {
  render(main, createFilter(getFilter()));
  render(render(main, board.getElement()), noCard);
};

const [menu] = render(main, createMenu());

if (CARD_COUNT) {
  render(main, createSearch());
  render(main, createFilter(getFilter()));
  boardController.init();
  render(main, statistics);
} else {
  renderMessageNoCard();
}

const mainController = new MainController(boardController, menu, statistics);
mainController.create();
