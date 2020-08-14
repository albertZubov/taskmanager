import { BoardController } from "./components/board";
import { CardList } from "./components/card-list";
import { getCard } from "./components/data";

const CARD_COUNT = 8;
const boardTask = new CardList().getElement();

export const getArrDataCards = (count) =>
  new Array(count).fill(``).map(getCard);

const boardController = new BoardController(
  boardTask,
  getArrDataCards(CARD_COUNT)
);
boardController.init();
