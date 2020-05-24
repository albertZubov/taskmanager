export const createCard = (
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
