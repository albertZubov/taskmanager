class ModelCard {
  constructor(data) {
    this.description = data[`description`] || ``;
    this.dueDate = new Date(data[`due_date`]);
    this.dueTime = new Date(data[`due_time`]);
    this.tags = new Set(data[`tags`] || []);
    this.repeatingDays = data[`repeating_days`];
    this.color = data[`color`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.isArchive = Boolean(data[`is_archive`]);
    this.isDate = Boolean(data[`is_date`]);
    this.isRepeat = Boolean(data[`is_repeat`]);
  }
}
