export const createFilter = (data) => `
  <section class="main__filter filter container">
    ${data
      .map(
        (elem) => `
      <input
          type="radio"
          id="filter__${elem.title.toLowerCase()}"
          class="filter__input visually-hidden"
          name="filter"
          ${elem.isActive === true ? `checked` : ``}
          ${elem.isDisabled === true || elem.count <= 0 ? `disabled` : ``}
        />
        <label for="filter__${elem.title.toLowerCase()}" class="filter__label">
          ${elem.title} <span class="filter__all-count">${
          elem.count
        }</span></label
      >
    `
      )
      .join(``)}
  </section>
`;
