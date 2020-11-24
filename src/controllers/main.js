import { main } from "../main";
import { BoardController } from "../controllers/board";
import { SearchController } from "./search";
import { render } from "../components/utils";
import { Search } from "../components/search";
import { getFilter } from "../components/data";
import { createFilter } from "../components/filter";
import { Menu } from "../components/menu";
import { StatisticsController } from "./statistics";

export class MainController {
  constructor(onDataChange) {
    this._onDataChange = onDataChange;
    this._search = new Search();
    this._boardController = null;
    this._searchController = null;
    this._statisticsController = null;
    this._menu = new Menu();
  }

  render(cards) {
    this._boardController = new BoardController(cards, this._onDataChange);
    this._searchController = new SearchController(
      cards,
      main,
      this._search.getElement(),
      this._boardController
    );
    this._statisticsController = new StatisticsController(cards);
    this._renderPage();
  }

  _renderPage() {
    if (this._search.getElement().parentNode.parentNode) {
      this._boardController.show();
    } else {
      render(main, this._menu.getElement());
      render(main, this._search.getElement());
      render(main, createFilter(getFilter()));
      this._boardController.show();
    }

    this._searchController.init();
    this._statisticsController.init();
    this._handlerEventsClick();
  }

  _handlerEventsClick() {
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
      this._searchController.show();
    });
  }
}
