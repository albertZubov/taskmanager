import { main, search } from "../main";
import { BoardController } from "../controllers/board";
import { CardList } from "../components/card-list";
import { getCard } from "../components/data";
import { SearchController } from "./search";

export const CARD_COUNT = 24;

const getArrDataCards = (count) => new Array(count).fill(``).map(getCard);
const cards = getArrDataCards(CARD_COUNT);
export class MainController {
  constructor(board, menu, statistics) {
    this._menu = menu;
    this._board = board;
    this._statistics = statistics;

    this._boardCard = new CardList().getElement();
    this._boardController = new BoardController(
      this._boardCard,
      cards,
      this._board
    );
  }

  create() {
    const onSearchBtnBack = () => {
      this._statistics.classList.add(`visually-hidden`);
      searchController.hide();
      this._boardController.show();
    };

    const searchController = new SearchController(
      main,
      search.getElement(),
      onSearchBtnBack
    );

    this._boardController.show();

    this._menu.addEventListener(`change`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      /* eslint-disable */

      switch (evt.target.id) {
        case `control__task`:
          this._statistics.classList.add(`visually-hidden`);
          this._boardController.show();
          break;

        case `control__statistic`:
          this._statistics.classList.remove(`visually-hidden`);
          this._boardController.hide();
          break;

        case `control__new-task`:
          this._boardController.createCard();
          this._menu.querySelector(`#control__task`).checked = true;
          break;
      }
    });

    search.getElement().addEventListener(`click`, () => {
      this._statistics.classList.add(`visually-hidden`);
      this._boardController.hide();
      searchController.show(cards);
    });
  }
}
