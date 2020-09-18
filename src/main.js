import { NoCard } from "./components/no-card";
import { render } from "./components/utils";
import { createMenu } from "./components/menu";
import { createFilter } from "./components/filter";
import { getFilter } from "./components/data";
import { Search } from "./components/search";
import { Board } from "./components/board";
import { MainController, CARD_COUNT } from "./controllers/main";
import { Statistics } from "./components/statistics";

const board = new Board();
const statistics = new Statistics().getElement();
statistics.classList.add(`visually-hidden`);

// Очистка main
export const main = document.querySelector(`.main`);
const controlRemove = main.querySelector(`.control`);
main.removeChild(controlRemove);

const noCard = new NoCard().getElement();
const renderMessageNoCard = () => {
  render(main, createFilter(getFilter()));
  render(render(main, board.getElement()), noCard);
};

const [menu] = render(main, createMenu());
const mainController = new MainController(board, menu, statistics);
export const search = new Search();

if (CARD_COUNT) {
  render(main, search.getElement());
  render(main, createFilter(getFilter()));
  mainController.create();
  render(main, statistics);
} else {
  renderMessageNoCard();
}
