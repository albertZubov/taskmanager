import { CardController, CardMode } from "./card";
import { ModelCard } from "../components/model-card";

export class CardListController {
  constructor(container, onDataChange) {
    this._container = container;

    this._creatingCard = null;
    this._subscriptions = [];
    this._cards = [];

    this._onDataChange = onDataChange;
    this._onChangeView = this._onChangeView.bind(this);
  }

  setCards(cards) {
    this._cards = cards;

    this._container.innerHTML = ``;
    this._cards.forEach((card) => {
      this._renderCards(card);
    });
  }

  addCards(cards) {
    cards.forEach((card) => {
      this._renderCards(card);
    });
    this._cards = this._cards.concat(cards);
  }

  _renderCards(card) {
    const cardController = new CardController(
      this._container,
      card,
      this._onDataChange,
      this._onChangeView,
      CardMode.default
    );

    this._subscriptions.push(cardController);
  }

  _onChangeView() {
    this._subscriptions.forEach((subscriptionItem) =>
      subscriptionItem.setDefaultView()
    );
  }

  _cleanContainer() {
    this._container.innerHTML = ``;
    this._subscriptions = [];
  }

  /* eslint-disable */
  createCard() {
    if (this._creatingCard) {
      return;
    }

    const defaultCard = {
      description: `Find money for travel`,
      id: "",
      color: `yellow`,
      tags: new Set(["cinema", "entertainment", "myself"]),
      due_date: new Date(),
      is_favorite: true,
      is_archived: true,
      repeating_days: {
        mo: false,
        tu: false,
        we: false,
        th: false,
        fr: false,
        sa: false,
        su: false,
      },
    };

    const cardToModel = new ModelCard(defaultCard);

    this._creatingCard = new CardController(
      this._container,
      cardToModel,
      this._onDataChange,
      this._onChangeView,
      CardMode.add
    );
  }
}
