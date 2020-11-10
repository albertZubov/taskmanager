import { CardController, modeCard } from "./card";

export class CardListController {
  constructor(container, onDataChange) {
    this._container = container;
    // this._onDataChangeMain = onDataChange;

    this._creatingCard = null;
    this._subscriptions = [];
    this._cards = [];

    this._onDataChange = onDataChange;
    this._onChangeView = this._onChangeView.bind(this);
  }

  setCards(cards) {
    this._cards = cards;
    // this._subscriptions = [];

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
      modeCard.default
    );

    this._subscriptions.push(cardController);
  }

  _onChangeView() {
    this._subscriptions.forEach((subscriptionItem) =>
      subscriptionItem.setDefaultView()
    );
  }

  // _onDataChange(newData, oldData) {
  //   const index = this._cards.findIndex((card) => card === oldData);

  //   if (newData === null && oldData === null) {
  //     this._creatingCard = null;
  //   } else if (newData === null && this._cards.includes(oldData)) {
  //     this._cards = [
  //       ...this._cards.slice(0, index),
  //       ...this._cards.slice(index + 1),
  //     ];
  //   } else if (oldData === null) {
  //     this._creatingCard = null;
  //     this._cards = [...this._cards, newData];
  //   } else {
  //     this._cards[index] = newData;
  //   }

  //   this._cleanContainer();
  //   this._onDataChangeMain(this._cards);
  // }

  _cleanContainer() {
    this._container.innerHTML = ``;
    this._subscriptions = [];
  }

  createCard() {
    if (this._creatingCard) {
      return;
    }

    const defaultCard = {
      description: `Find money for travel`,
      color: `yellow`,
      tags: new Set(),
      dueDate: new Date(),
      dueTime: new Date(),
      isRepeat: true,
      isDate: true,
      repeatingDays: {},
    };

    this._creatingCard = new CardController(
      this._container,
      defaultCard,
      this._onDataChange,
      this._onChangeView,
      modeCard.add
    );
  }
}
