import { Card } from "../components/card";
import { CardEdit } from "../components/card-edit";
import { render } from "../components/utils";
import flatpickr from "flatpickr";

export const modeCard = {
  add: `adding`,
  default: `default`,
};

export class CardController {
  constructor(container, data, onDataChange, onChangeView, mode) {
    this._container = container;
    this._data = data;
    this._mode = mode;
    this._card = new Card(data);
    this._cardEdit = new CardEdit(data);
    this._currentColor = this._data.color;

    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this.create();
  }

  create() {
    let currentView = this._card;

    if (this._mode === modeCard.add) {
      currentView = this._cardEdit;
    }

    const date = this._cardEdit.getElement().querySelector(`.card__date`);

    if (Array.from(date.classList).includes(`flatpickr-input`)) {
      return;
    } else {
      flatpickr(date, {
        altInput: true,
        allowInput: true,
        defaultDate: this._data.dueDate,
      });
    }

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        if (this._mode === modeCard.default) {
          if (this._container.contains(this._cardEdit.getElement())) {
            this._container.replaceChild(
              this._card.getElement(),
              this._cardEdit.getElement()
            );
          }
        } else if (this._mode === modeCard.add) {
          this._container.removeChild(currentView.getElement());
        }

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
      .querySelector(`.card__delete`)
      .addEventListener(`click`, () => {
        this._onDataChange(null, this._data);
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

        this._onDataChange(
          entry,
          this._mode === modeCard.default ? this._data : null
        );

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._cardEdit
      .getElement()
      .querySelector(`.card__colors-wrap`)
      .addEventListener(`click`, (evt) => {
        if (evt.target.tagName !== `INPUT`) {
          return;
        }

        const classDomList = this._cardEdit.getElement().classList;
        classDomList.remove(`card--${this._currentColor}`);
        classDomList.add(`card--${evt.target.value}`);
        this._currentColor = evt.target.value;
      });

    render(this._container, currentView.getElement());
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
