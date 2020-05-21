"use strict";

(function () {
  const main = document.querySelector(`.main`);

  const modifierCl = {
    card: {
      color: {
        black: `black`,
        yellow: `yellow`,
      },
      edit: `edit`,
      repeat: `repeat`,
    },
    btn: {
      edit: `edit`,
      archive: `archive`,
      favorites: `favorites`,
      disabled: `disabled`,
    },
  };

  // Очистка main
  const controlRemove = main.querySelector(`.control`);
  main.removeChild(controlRemove);

  const board = () => `
  <section class="board container">
        <div class="board__filter-list">
          <a href="#" class="board__filter" data-sort-type="default">SORT BY DEFAULT</a>
          <a href="#" class="board__filter" data-sort-type="date-up">SORT BY DATE up</a>
          <a href="#" class="board__filter" data-sort-type="date-down">SORT BY DATE down</a>
        </div>
        <div class="board__tasks"></div>
      </section>
  `;

  const card = (
    color,
    btnEdit,
    btnArchive,
    btnFavorites,
    btnDisabled,
    content,
    date,
    time
  ) => `  
<article class="card card--${color}">
  <div class="card__form">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--${btnEdit}">
        edit
        </button>
        <button type="button" class="card__btn card__btn--${btnArchive}">
        archive
        </button>
        <button
          type="button"
          class="card__btn card__btn--${btnFavorites} card__btn--${btnDisabled}"
        >
        favorites
        </button>
      </div>

      <div class="card__color-bar">
        <svg class="card__color-bar-wave" width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <p class="card__text">${content}</p>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <div class="card__date-deadline">
              <p class="card__input-deadline-wrap">
                <span class="card__date">${date}</span>
                <span class="card__time">${time}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</article>
  `;

  const cardEdit = (
    edit,
    color,
    repeat,
    content,
    dateStatus,
    dateValue,
    repeatStatus
  ) => `
  <article class="card card--${edit} card--${color} card--${repeat}">
  <form class="card__form" method="get">
    <div class="card__inner">
      <div class="card__color-bar">
        <svg class="card__color-bar-wave" width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <label>
          <textarea
            class="card__text"
            placeholder="Start typing your text here..."
            name="text"
          >${content}</textarea>
        </label>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">${dateStatus}</span>
            </button>

            <fieldset class="card__date-deadline">
              <label class="card__input-deadline-wrap">
                <input
                  class="card__date"
                  type="text"
                  placeholder=""
                  name="date"
                  value="${dateValue}"
                />
              </label>
            </fieldset>

            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">${repeatStatus}</span>
            </button>

            <fieldset class="card__repeat-days">
              <div class="card__repeat-days-inner">
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-mo-4"
                  name="repeat"
                  value="mo"
                />
                <label class="card__repeat-day" for="repeat-mo-4"
                  >mo</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-tu-4"
                  name="repeat"
                  value="tu"
                  checked
                />
                <label class="card__repeat-day" for="repeat-tu-4"
                  >tu</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-we-4"
                  name="repeat"
                  value="we"
                />
                <label class="card__repeat-day" for="repeat-we-4"
                  >we</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-th-4"
                  name="repeat"
                  value="th"
                />
                <label class="card__repeat-day" for="repeat-th-4"
                  >th</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-fr-4"
                  name="repeat"
                  value="fr"
                  checked
                />
                <label class="card__repeat-day" for="repeat-fr-4"
                  >fr</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  name="repeat"
                  value="sa"
                  id="repeat-sa-4"
                />
                <label class="card__repeat-day" for="repeat-sa-4"
                  >sa</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-su-4"
                  name="repeat"
                  value="su"
                  checked
                />
                <label class="card__repeat-day" for="repeat-su-4"
                  >su</label
                >
              </div>
            </fieldset>
          </div>
        </div>

        <div class="card__colors-inner">
          <h3 class="card__colors-title">Color</h3>
          <div class="card__colors-wrap">
            <input
              type="radio"
              id="color-black-4"
              class="card__color-input card__color-input--black visually-hidden"
              name="color"
              value="black"
            />
            <label
              for="color-black-4"
              class="card__color card__color--black"
              >black</label
            >
            <input
              type="radio"
              id="color-yellow-4"
              class="card__color-input card__color-input--yellow visually-hidden"
              name="color"
              value="yellow"
              checked
            />
            <label
              for="color-yellow-4"
              class="card__color card__color--yellow"
              >yellow</label
            >
            <input
              type="radio"
              id="color-blue-4"
              class="card__color-input card__color-input--blue visually-hidden"
              name="color"
              value="blue"
            />
            <label
              for="color-blue-4"
              class="card__color card__color--blue"
              >blue</label
            >
            <input
              type="radio"
              id="color-green-4"
              class="card__color-input card__color-input--green visually-hidden"
              name="color"
              value="green"
            />
            <label
              for="color-green-4"
              class="card__color card__color--green"
              >green</label
            >
            <input
              type="radio"
              id="color-pink-4"
              class="card__color-input card__color-input--pink visually-hidden"
              name="color"
              value="pink"
            />
            <label
              for="color-pink-4"
              class="card__color card__color--pink"
              >pink</label
            >
          </div>
        </div>
      </div>

      <div class="card__status-btns">
        <button class="card__save" type="submit">save</button>
        <button class="card__delete" type="button">delete</button>
      </div>
    </div>
  </form>
</article>
  `;

  const filter = (
    countAll,
    countOverdue,
    countToday,
    countFavorites,
    countRepeating,
    countArchive
  ) => `
        <section class="main__filter filter container">
        <input
          type="radio"
          id="filter__all"
          class="filter__input visually-hidden"
          name="filter"
          checked
        />
        <label for="filter__all" class="filter__label">
          All <span class="filter__all-count">${countAll}</span></label
        >
        <input
          type="radio"
          id="filter__overdue"
          class="filter__input visually-hidden"
          name="filter"
          disabled
        />
        <label for="filter__overdue" class="filter__label"
          >Overdue <span class="filter__overdue-count">${countOverdue}</span></label
        >
        <input
          type="radio"
          id="filter__today"
          class="filter__input visually-hidden"
          name="filter"
          disabled
        />
        <label for="filter__today" class="filter__label"
          >Today <span class="filter__today-count">${countToday}</span></label
        >
        <input
          type="radio"
          id="filter__favorites"
          class="filter__input visually-hidden"
          name="filter"
        />
        <label for="filter__favorites" class="filter__label"
          >Favorites <span class="filter__favorites-count">${countFavorites}</span></label
        >
        <input
          type="radio"
          id="filter__repeating"
          class="filter__input visually-hidden"
          name="filter"
        />
        <label for="filter__repeating" class="filter__label"
          >Repeating <span class="filter__repeating-count">${countRepeating}</span></label
        >
        <input
          type="radio"
          id="filter__archive"
          class="filter__input visually-hidden"
          name="filter"
        />
        <label for="filter__archive" class="filter__label"
          >Archive <span class="filter__archive-count">${countArchive}</span></label
        >
      </section>
  `;

  const control = () => `
  <section class="main__control control container">
  <h1 class="control__title">TASKMANAGER</h1>
  <section class="control__btn-wrap">
    <input
      type="radio"
      name="control"
      id="control__new-task"
      class="control__input visually-hidden"
    />
    <label for="control__new-task" class="control__label control__label--new-task"
      >+ ADD NEW TASK</label
    >
    <input
      type="radio"
      name="control"
      id="control__task"
      class="control__input visually-hidden"
      checked
    />
    <label for="control__task" class="control__label">TASKS</label>
    <input
      type="radio"
      name="control"
      id="control__statistic"
      class="control__input visually-hidden"
    />
    <label for="control__statistic" class="control__label"
      >STATISTICS</label
    >
  </section>
</section>
  `;

  const loadMore = () => `
    <button class="load-more" type="button">load-more</button>
  `;

  const render = (container, element) => {
    const div = document.createElement(`div`);
    div.innerHTML = element;
    // div.insertAdjacentHTML(`beforeEnd`, element);
    const node = div.firstElementChild;
    container.append(node);

    return node;
  };

  render(main, control());
  render(main, filter(13, 0, 0, 1, 1, 115));

  const boardElem = render(main, board());
  const boardTask = boardElem.querySelector(`.board__tasks`);
  render(
    boardTask,
    cardEdit(
      modifierCl.card.edit,
      modifierCl.card.color.yellow,
      modifierCl.card.repeat,
      `Here is a card with filled data`,
      `yes`,
      `23 September 16:15`,
      `yes`
    )
  );

  render(
    boardTask,
    card(
      modifierCl.card.color.black,
      modifierCl.btn.edit,
      modifierCl.btn.archive,
      modifierCl.btn.favorites,
      modifierCl.btn.disabled,
      `Example task with custom color.`,
      `23 September`,
      `16:15`
    )
  );

  render(
    boardTask,
    card(
      modifierCl.card.color.black,
      modifierCl.btn.edit,
      modifierCl.btn.archive,
      modifierCl.btn.favorites,
      modifierCl.btn.disabled,
      `Example task with custom color.`,
      `23 September`,
      `16:15`
    )
  );

  render(
    boardTask,
    card(
      modifierCl.card.color.black,
      modifierCl.btn.edit,
      modifierCl.btn.archive,
      modifierCl.btn.favorites,
      modifierCl.btn.disabled,
      `Example task with custom color.`,
      `23 September`,
      `16:15`
    )
  );

  render(boardElem, loadMore());
})();
