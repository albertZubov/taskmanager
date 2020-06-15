const arrBtns = [
  {
    type: `default`,
    content: `DEFAULT`,
  },
  {
    type: `date-up`,
    content: `DATE up`,
  },
  {
    type: `date-down`,
    content: `DATE down`,
  },
];

export const createBoard = () => `
  <section class="board container">
        <div class="board__filter-list">
        ${arrBtns
          .map(
            (elem) =>
              `<a href="#" class="board__filter" data-sort-type="${elem.type}">
              SORT BY ${elem.content}
            </a>`
          )
          .join(``)}
        </div>
        <div class="board__tasks"></div>
      </section>
  `;
