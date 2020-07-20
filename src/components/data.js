const getRandomBoolean = () => Boolean(Math.round(Math.random()));

const getRandomNumber = (number) => getCountRandom(0, number);

const getCountRandom = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

export const getCard = () => ({
  description: [
    `Prepare for the pitch`,
    `Find money for travel`,
    `Eat something`,
  ][getRandomNumber(3)],
  dueDate: new Date(Date.now() + 1 + getRandomNumber(7) * 24 * 60 * 60 * 1000),
  dueTime: new Date(),
  tags: new Set([`homework`, `theory`, `practice`, `intensive`, `keks`]),
  repeatingDays: {
    mo: false,
    tu: false,
    we: getRandomBoolean(),
    th: false,
    fr: false,
    sa: false,
    su: false,
  },
  color: [`black`, `yellow`, `blue`, `green`, `pink`][getRandomNumber(5)],
  isFavorite: getRandomBoolean(),
  isArchive: getRandomBoolean(),
  isDate: getRandomBoolean(),
  isRepeat: getRandomBoolean(),
  date: new Date(),
  modifierCl: {
    edit: `edit`,
    repeat: `repeat`,
  },
});

export const getFilter = () => [
  {
    title: `All`,
    count: getCountRandom(1, 100),
    isActive: true,
    isDisabled: false,
  },
  {
    title: `Overdue`,
    count: 0,
    isActive: false,
    isDisabled: true,
  },
  {
    title: `Today`,
    count: 0,
    isActive: false,
    isDisabled: true,
  },
  {
    title: `Favorites`,
    count: getCountRandom(1, 10),
    isActive: false,
    isDisabled: false,
  },
  {
    title: `Repeating`,
    count: getCountRandom(1, 10),
    isActive: false,
    isDisabled: false,
  },
  {
    title: `Archive`,
    count: getCountRandom(1, 100),
    isActive: false,
    isDisabled: false,
  },
];
