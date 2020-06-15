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
});

export const getFilter = () => [
  {
    title: `All`,
    count: getCountRandom(1, 100),
    status: `checked`,
  },
  {
    title: `Overdue`,
    count: 0,
    status: `disabled`,
  },
  {
    title: `Today`,
    count: 0,
    status: `disabled`,
  },
  {
    title: `Favorites`,
    count: getCountRandom(1, 10),
  },
  {
    title: `Repeating`,
    count: getCountRandom(1, 10),
  },
  {
    title: `Archive`,
    count: getCountRandom(1, 100),
  },
];
