export class MainController {
  constructor(boardController, menu, statistics) {
    this._menu = menu;
    this._boardController = boardController;
    this._statistics = statistics;
  }

  create() {
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
          this._menu.querySelector(`#control__new-task`).checked = true;
          break;
      }
    });
  }
}
