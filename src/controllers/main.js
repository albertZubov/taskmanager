import { main } from "../main";
import { BoardController } from "../controllers/board";
import { getCard } from "../components/data";
import { SearchController } from "./search";
import { render } from "../components/utils";
import { Search } from "../components/search";
import { getFilter } from "../components/data";
import { createFilter } from "../components/filter";
import { Menu } from "../components/menu";
import { StatisticsController } from "./statistics";

const CARD_COUNT = 24;
const getArrDataCards = (count) => new Array(count).fill(``).map(getCard);
const cards = getArrDataCards(CARD_COUNT);

export class MainController {
  constructor() {
    this._search = new Search();
    this._boardController = new BoardController(cards);
    this._statisticsController = new StatisticsController(cards);
    this._menu = new Menu();
  }

  _init() {
    this._renderPage();
    this._renderSearch();
  }

  _renderPage() {
    render(main, this._menu.getElement());
    render(main, this._search.getElement());
    render(main, createFilter(getFilter()));
    this._boardController.show();
    this._statisticsController._renderStatistics();
  }

  _renderSearch() {
    const onSearchBtnBack = () => {
      this._statisticsController.hide();
      searchController.hide();
      this._boardController.show();
    };

    const searchController = new SearchController(
      main,
      this._search.getElement(),
      onSearchBtnBack
    );

    this._menu.getElement().addEventListener(`change`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      /* eslint-disable */

      switch (evt.target.id) {
        case `control__task`:
          this._statisticsController.hide();
          this._boardController.show();
          break;

        case `control__statistic`:
          this._statisticsController.show();
          this._boardController.hide();
          break;

        case `control__new-task`:
          this._boardController.createCard();
          this._menu
            .getElement()
            .querySelector(`#control__task`).checked = true;
          break;
      }
    });

    this._search.getElement().addEventListener(`click`, () => {
      this._statisticsController.hide();
      this._boardController.hide();
      searchController.show(cards);
    });
  }
}
