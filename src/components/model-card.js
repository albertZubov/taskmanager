export class ModelCard {
  constructor(data) {
    this.id = data[`id`];
    this.description = data[`description`] || ``;
    this.dueDate = new Date(data[`due_date`]);
    this.dueTime = new Date(data[`due_time`]);
    this.tags = new Set(data[`tags`] || []);
    this.repeatingDays = data[`repeating_days`];
    this.color = data[`color`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.isArchive = Boolean(data[`is_archived`]);
    this.isDate = Boolean(data[`is_date`]);
    this.isRepeat = Boolean(data[`is_repeat`]);
  }

  static parseCard(data) {
    return new ModelCard(data);
  }

  static parseCards(data) {
    return data.map((card) => ModelCard.parseCard(card));
  }
}
