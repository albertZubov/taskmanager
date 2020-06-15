const arrTitle = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `archive`,
];

export const createFilter = (data) => `
  <section class="main__filter filter container">
    ${data
      .map(
        (elem, ind) => `
      <input
          type="radio"
          id="filter__${arrTitle[ind]}"
          class="filter__input visually-hidden"
          name="filter"
          ${elem.status ? elem.status : ``}
        />
        <label for="filter__${arrTitle[ind]}" class="filter__label">
          ${elem.title} <span class="filter__all-count">${
          elem.count
        }</span></label
      >
    `
      )
      .join(``)}
  </section>
`;
