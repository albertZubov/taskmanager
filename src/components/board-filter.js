const arrBtn = [
  {
    type: `default`,
    contents: `DEFAULT`,
  },
  {
    type: `date-up`,
    contents: `DATE up`,
  },
  {
    type: `date-down`,
    contents: `DATE down`,
  },
];

export const createBoardFilter = () => {
  return `
  <div class="board__filter-list">
      ${arrBtn
        .map(
          (elem) =>
            `<a href="#" class="board__filter" data-sort-type="${elem.type}">SORT BY ${elem.contents}</a>`
        )
        .join(``)}
      </div>
  `;
};
