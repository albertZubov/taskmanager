export const createFilter = (data) => `
        <section class="main__filter filter container">
        <input
          type="radio"
          id="filter__all"
          class="filter__input visually-hidden"
          name="filter"
          checked
        />
        <label for="filter__all" class="filter__label">
          ${data[0].title[0]} <span class="filter__all-count">${data[1].count(
  1,
  100
)}</span></label
        >
        <input
          type="radio"
          id="filter__overdue"
          class="filter__input visually-hidden"
          name="filter"
          disabled
        />
        <label for="filter__overdue" class="filter__label"
          >${
            data[0].title[1]
          } <span class="filter__overdue-count"></span></label
        >
        <input
          type="radio"
          id="filter__today"
          class="filter__input visually-hidden"
          name="filter"
          disabled
        />
        <label for="filter__today" class="filter__label"
          >${data[0].title[2]} <span class="filter__today-count"></span></label
        >
        <input
          type="radio"
          id="filter__favorites"
          class="filter__input visually-hidden"
          name="filter"
        />
        <label for="filter__favorites" class="filter__label"
          >${
            data[0].title[3]
          } <span class="filter__favorites-count">${data[1].count(
  1,
  10
)}</span></label
        >
        <input
          type="radio"
          id="filter__repeating"
          class="filter__input visually-hidden"
          name="filter"
        />
        <label for="filter__repeating" class="filter__label"
          >${
            data[0].title[4]
          } <span class="filter__repeating-count">${data[1].count(
  1,
  10
)}</span></label
        >
        <input
          type="radio"
          id="filter__archive"
          class="filter__input visually-hidden"
          name="filter"
        />
        <label for="filter__archive" class="filter__label"
          >${
            data[0].title[5]
          } <span class="filter__archive-count">${data[1].count(
  1,
  100
)}</span></label
        >
      </section>
  `;
