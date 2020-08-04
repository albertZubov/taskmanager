export const createBoard = (markUp = false) => {
  return `
  <section class="board container">
      ${markUp ? `${markUp}<div class="board__tasks"></div>` : ``}
    </section>
  `;
};
