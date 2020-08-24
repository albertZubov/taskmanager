import { Card } from "../components/card";
import { CardEdit } from "../components/card-edit";
import { render } from "../components/utils";
import flatpickr from "flatpickr";

export class CardController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._card = new Card(data);
    this._cardEdit = new CardEdit(data);

    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this.create();
  }

  create() {
    flatpickr(this._cardEdit.getElement().querySelector(`.card__date`), {
      altInput: true,
      allowInput: true,
      defaultDate: this._data.dueDate,
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.replaceChild(
          this._card.getElement(),
          this._cardEdit.getElement()
        );
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._card
      .getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        this._container.replaceChild(
          this._cardEdit.getElement(),
          this._card.getElement()
        );
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._cardEdit
      .getElement()
      .querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._cardEdit
      .getElement()
      .querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._cardEdit
      .getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, () => {
        this._container.replaceChild(
          this._card.getElement(),
          this._cardEdit.getElement()
        );

        const formData = new FormData(
          this._cardEdit.getElement().querySelector(`.card__form`)
        );

        const entry = {
          description: formData.get(`text`),
          color: formData.get(`color`),
          tags: new Set(formData.getAll(`hashtag`)),
          dueDate: new Date(formData.get(`date`)),
          dueTime: this._data.dueTime,
          isRepeat: this._cardEdit._isRepeat,
          isDate: this._cardEdit._isDate,
          repeatingDays: formData.getAll(`repeat`).reduce(
            (acc, it) => {
              acc[it] = true;
              return acc;
            },
            {
              mo: false,
              tu: false,
              we: false,
              th: false,
              fr: false,
              sa: false,
              su: false,
            }
          ),
        };
        this._onDataChange(entry, this._data);

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._container, this._card.getElement());
  }

  setDefaultView() {
    if (this._container.contains(this._cardEdit.getElement())) {
      this._container.replaceChild(
        this._card.getElement(),
        this._cardEdit.getElement()
      );
    }
  }
}
